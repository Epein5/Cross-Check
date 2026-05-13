from fastapi import APIRouter, Depends
from supabase import Client

from core.security import security, verify_bearer_token
from schemas.profiles import ProfileResponse, UpdateProfileRequest
from services.profiles import update_profile
from supabase_client import get_supabase

router = APIRouter()


@router.patch("/profile", response_model=ProfileResponse)
async def update_my_profile(
    body: UpdateProfileRequest,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)

    updates = {}
    if body.full_name is not None:
        updates["full_name"] = body.full_name
    if body.avatar_url is not None:
        updates["avatar_url"] = body.avatar_url

    profile = update_profile(user["id"], updates, supabase)
    return ProfileResponse(**profile)
