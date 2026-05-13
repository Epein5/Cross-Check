from datetime import datetime

from pydantic import BaseModel


class CreateOrgRequest(BaseModel):
    name: str


class OrgResponse(BaseModel):
    id: str
    name: str
    slug: str
    owner_id: str
    created_at: datetime


class OrgListItem(BaseModel):
    id: str
    name: str
    slug: str
    role: str


class InviteMemberRequest(BaseModel):
    email: str
    role: str


class MemberResponse(BaseModel):
    id: str
    user_id: str
    email: str | None = None
    full_name: str | None = None
    role: str
    created_at: datetime | None = None
