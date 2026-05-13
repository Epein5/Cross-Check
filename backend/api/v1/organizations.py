from fastapi import APIRouter, Depends
from supabase import Client

from core.security import security, verify_bearer_token
from schemas.organizations import (
    CreateOrgRequest,
    InviteMemberRequest,
    MemberResponse,
    OrgListItem,
    OrgResponse,
)
from services.organizations import (
    create_org,
    get_org_by_id,
    invite_member,
    list_members,
    list_user_orgs,
    remove_member,
)
from supabase_client import get_supabase

router = APIRouter()


@router.post("/organizations", response_model=OrgResponse)
async def create_organization(
    body: CreateOrgRequest,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    org = create_org(body.name, user["id"], supabase)
    return OrgResponse(**org)


@router.get("/organizations/{org_id}", response_model=OrgResponse)
async def get_organization(
    org_id: str,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    org = get_org_by_id(org_id, user["id"], supabase)
    return OrgResponse(**org)


@router.get("/organizations", response_model=list[OrgListItem])
async def list_organizations(
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    items = list_user_orgs(user["id"], supabase)
    return [OrgListItem(**item) for item in items]


@router.get(
    "/organizations/{org_id}/members", response_model=list[MemberResponse]
)
async def list_org_members(
    org_id: str,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    items = list_members(org_id, user["id"], supabase)
    return [MemberResponse(**item) for item in items]


@router.post("/organizations/{org_id}/members", response_model=MemberResponse)
async def invite_org_member(
    org_id: str,
    body: InviteMemberRequest,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    member = invite_member(org_id, user["id"], body.email, body.role, supabase)
    return MemberResponse(**member)


@router.delete("/organizations/{org_id}/members/{target_user_id}", status_code=204)
async def remove_org_member(
    org_id: str,
    target_user_id: str,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    remove_member(org_id, user["id"], target_user_id, supabase)
