from urllib.parse import urlencode

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse

from core.config import settings
from core.security import security, verify_bearer_token

router = APIRouter()


@router.get("/google")
def start_google_auth() -> RedirectResponse:
    """Initiate Google OAuth flow."""
    base_url = settings.supabase_url.rstrip("/")
    query_params = urlencode(
        {
            "provider": "google",
            "prompt": "select_account",
        }
    )
    oauth_url = f"{base_url}/auth/v1/authorize?{query_params}"
    return RedirectResponse(oauth_url, status_code=307)


@router.post("/signout")
async def signout(credentials=Depends(security)) -> dict[str, str]:
    """Sign out the current user and invalidate their session."""
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing access token",
        )

    await verify_bearer_token(credentials)
    return {"message": "Successfully signed out"}
