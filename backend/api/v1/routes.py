from fastapi import APIRouter

from api.v1 import auth

router = APIRouter()


@router.get("/health")
def read_root() -> dict[str, str]:
    return {"message": "Hello from cross-check!"}


router.include_router(auth.router, prefix="/auth")
