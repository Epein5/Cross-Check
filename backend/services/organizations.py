from fastapi import HTTPException, status
from supabase import Client

from utils.slug import generate_unique_slug


def create_org(name: str, owner_id: str, supabase: Client) -> dict:
    slug = generate_unique_slug(name, supabase)

    org_result = (
        supabase.table("organizations")
        .insert({"name": name, "slug": slug, "owner_id": owner_id})
        .execute()
    )
    org = org_result.data[0]

    supabase.table("organization_members").insert(
        {
            "organization_id": org["id"],
            "user_id": owner_id,
            "role": "owner",
            "invited_by": owner_id,
        }
    ).execute()

    return org


def list_user_orgs(user_id: str, supabase: Client) -> list[dict]:
    result = (
        supabase.table("organization_members")
        .select("organizations!inner(*)", "role")
        .eq("user_id", user_id)
        .execute()
    )

    items = []
    for row in result.data:
        org = row["organizations"]
        items.append(
            {
                "id": org["id"],
                "name": org["name"],
                "slug": org["slug"],
                "role": row["role"],
            }
        )

    return items


def _require_member_role(
    org_id: str, user_id: str, allowed_roles: tuple[str, ...], supabase: Client
) -> str:
    membership = (
        supabase.table("organization_members")
        .select("role")
        .eq("organization_id", org_id)
        .eq("user_id", user_id)
        .maybe_single()
        .execute()
    )
    if not membership.data:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this organization",
        )

    role = membership.data["role"]
    if role not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only owners and admins can manage members",
        )

    return role


def get_org_by_id(org_id: str, user_id: str, supabase: Client) -> dict:
    _require_member_role(org_id, user_id, ("owner", "admin", "auditor", "viewer"), supabase)

    result = (
        supabase.table("organizations")
        .select("*")
        .eq("id", org_id)
        .single()
        .execute()
    )
    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Organization not found"
        )

    return result.data


def list_members(org_id: str, user_id: str, supabase: Client) -> list[dict]:
    _require_member_role(org_id, user_id, ("owner", "admin", "auditor", "viewer"), supabase)

    result = (
        supabase.table("organization_members")
        .select("id, user_id, role, created_at, profiles!inner(email, full_name)")
        .eq("organization_id", org_id)
        .execute()
    )

    items = []
    for row in result.data:
        profile = row["profiles"]
        items.append(
            {
                "id": row["id"],
                "user_id": row["user_id"],
                "email": profile.get("email"),
                "full_name": profile.get("full_name"),
                "role": row["role"],
                "created_at": row.get("created_at"),
            }
        )

    return items


def invite_member(
    org_id: str, inviter_id: str, email: str, role: str, supabase: Client
) -> dict:
    _require_member_role(org_id, inviter_id, ("owner", "admin"), supabase)

    profile_result = (
        supabase.table("profiles")
        .select("id, email, full_name")
        .eq("email", email)
        .maybe_single()
        .execute()
    )
    if not profile_result.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    target_user = profile_result.data

    existing = (
        supabase.table("organization_members")
        .select("id")
        .eq("organization_id", org_id)
        .eq("user_id", target_user["id"])
        .maybe_single()
        .execute()
    )
    if existing.data:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User is already a member",
        )

    insert_result = (
        supabase.table("organization_members")
        .insert(
            {
                "organization_id": org_id,
                "user_id": target_user["id"],
                "role": role,
                "invited_by": inviter_id,
            }
        )
        .execute()
    )
    member = insert_result.data[0]

    return {
        "id": member["id"],
        "user_id": member["user_id"],
        "email": target_user.get("email"),
        "full_name": target_user.get("full_name"),
        "role": member["role"],
        "created_at": member.get("created_at"),
    }


def remove_member(
    org_id: str, requester_id: str, target_user_id: str, supabase: Client
) -> None:
    _require_member_role(org_id, requester_id, ("owner", "admin"), supabase)

    target = (
        supabase.table("organization_members")
        .select("role")
        .eq("organization_id", org_id)
        .eq("user_id", target_user_id)
        .maybe_single()
        .execute()
    )
    if not target.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Member not found"
        )
    if target.data["role"] == "owner":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Cannot remove the owner"
        )

    supabase.table("organization_members").delete().eq(
        "organization_id", org_id
    ).eq("user_id", target_user_id).execute()
