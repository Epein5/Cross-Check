from fastapi import APIRouter

from api.v1 import auth, integrations, organizations, profiles

router = APIRouter()


@router.get("/health")
def read_root() -> dict[str, str]:
    return {"message": "Hello from cross-check!"}


router.include_router(auth.router, prefix="/auth")
router.include_router(organizations.router)
router.include_router(integrations.router)
router.include_router(profiles.router)
