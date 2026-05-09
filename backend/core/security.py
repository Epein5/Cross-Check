from fastapi import HTTPException, status
from fastapi.security import HTTPBearer

security = HTTPBearer()


async def verify_bearer_token(credentials) -> str:
    """Extract and validate Bearer token from credentials."""
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing access token",
        )
    return credentials.credentials
