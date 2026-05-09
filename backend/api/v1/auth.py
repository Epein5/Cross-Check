from urllib.parse import urlencode

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse

from backend.core.config import settings
from backend.core.security import security, verify_bearer_token

router = APIRouter()


@router.get("/google")
def start_google_auth() -> RedirectResponse:
    """Initiate Google OAuth flow."""
    base_url = settings.supabase_url.rstrip("/")
    query_params = urlencode({"provider": "google"})
    oauth_url = f"{base_url}/auth/v1/authorize?{query_params}"
    return RedirectResponse(oauth_url, status_code=307)


@router.post("/signout")
async def signout(credentials = Depends(security)) -> dict[str, str]:
    """Sign out the current user and invalidate their session."""
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing access token",
        )
    # TODO: Token validation, blacklisting, or audit logging
    return {"message": "Successfully signed out"}
