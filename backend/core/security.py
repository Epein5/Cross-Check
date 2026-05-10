import httpx
from fastapi import HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from core.config import settings

security = HTTPBearer()


async def verify_bearer_token(credentials: HTTPAuthorizationCredentials) -> dict:
    """Validate a Bearer token by asking Supabase for the current user."""
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing access token",
        )

    token = credentials.credentials
    user_url = f"{settings.supabase_url.rstrip('/')}/auth/v1/user"

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(
                user_url,
                headers={
                    "Authorization": f"Bearer {token}",
                    "apikey": settings.supabase_anon_key,
                },
            )
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or revoked token",
        ) from exc

    if response.status_code != status.HTTP_200_OK:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or revoked token",
        )

    return response.json()
