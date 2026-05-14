from fastapi import HTTPException, status
from supabase import Client

from schemas.integrations import IntegrationResponse
from services.composio_client import get_composio


def _initiate_databricks(org_id: str, supabase: Client) -> tuple[str, str]:
    composio = get_composio()
    session = composio.create(user_id=str(org_id))
    connection_request = session.authorize("databricks")
    _upsert_integration(org_id, "databricks", connection_request.id, supabase)
    return connection_request.redirect_url, connection_request.id


def _upsert_integration(org_id: str, platform: str, connection_id: str, supabase: Client) -> None:
    existing = (
        supabase.table("organization_integrations")
        .select("id")
        .eq("organization_id", org_id)
        .eq("platform", platform)
        .maybe_single()
        .execute()
    )

    payload = {
        "organization_id": org_id,
        "platform": platform,
        "connection_id": connection_id,
        "enabled": True,
    }

    if existing and existing.data:
        supabase.table("organization_integrations").update(payload).eq(
            "id", existing.data["id"]
        ).execute()
    else:
        supabase.table("organization_integrations").insert(payload).execute()


def initiate_connection(
    org_id: str, platform: str, config: dict | None, supabase: Client
) -> tuple[str | None, str | None, str]:
    if platform == "databricks":
        redirect_url, connection_id = _initiate_databricks(org_id, supabase)
        return redirect_url, connection_id, "redirect"

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=f"Unsupported platform: {platform}",
    )


def verify_connection(connection_id: str) -> tuple[str, str | None]:
    composio = get_composio()
    try:
        account = composio.connected_accounts.get(connection_id)
        status_str = account.status if hasattr(account, "status") else "ACTIVE"
        connected_id = account.id if hasattr(account, "id") else connection_id
        return status_str, connected_id
    except Exception:
        return "FAILED", None


def list_integrations(org_id: str, supabase: Client) -> list[IntegrationResponse]:
    result = (
        supabase.table("organization_integrations")
        .select("*")
        .eq("organization_id", org_id)
        .execute()
    )

    composio = get_composio()
    try:
        accounts = composio.connected_accounts.list(user_ids=[str(org_id)])
        account_map = {}
        if hasattr(accounts, "items"):
            for acct in accounts.items:
                account_map[acct.id] = acct.status if hasattr(acct, "status") else "ACTIVE"
    except Exception:
        account_map = {}

    items = []
    for row in result.data:
        conn_id = row.get("connection_id")
        status = None
        if conn_id and conn_id in account_map:
            status = account_map[conn_id]
        elif conn_id:
            status = "PENDING"

        items.append(
            IntegrationResponse(
                id=row["id"],
                organization_id=row["organization_id"],
                platform=row["platform"],
                enabled=row.get("enabled", True),
                connection_id=conn_id,
                status=status,
                created_at=row.get("created_at"),
            )
        )

    return items


def remove_integration(
    org_id: str, integration_id: str, supabase: Client
) -> None:
    row = (
        supabase.table("organization_integrations")
        .select("*")
        .eq("id", integration_id)
        .eq("organization_id", org_id)
        .maybe_single()
        .execute()
    )
    if not row.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Integration not found",
        )

    conn_id = row.data.get("connection_id")
    if conn_id:
        composio = get_composio()
        try:
            composio.connected_accounts.delete(conn_id)
        except Exception:
            pass

    supabase.table("organization_integrations").delete().eq(
        "id", integration_id
    ).execute()
