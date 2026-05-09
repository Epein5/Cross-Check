from urllib.parse import urlencode

from fastapi import APIRouter
from fastapi.responses import RedirectResponse

from backend.core.config import settings

router = APIRouter()


@router.get("/google")
def start_google_auth() -> RedirectResponse:
    base_url = settings.supabase_url.rstrip("/")
    query = urlencode({"provider": "google"})
    oauth_url = f"{base_url}/auth/v1/authorize?{query}"
    return RedirectResponse(oauth_url, status_code=307)
