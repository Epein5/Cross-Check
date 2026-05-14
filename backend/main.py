from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import routes
from core.config import settings


def _init_composio():
    try:
        from services.composio_client import get_composio
        get_composio()
        print("Composio ready")
    except Exception as e:
        print(f"Composio init skipped: {e}")


app = FastAPI(title="Cross-Check API")

_init_composio()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router, prefix="/api/v1", tags=["v1"])


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Welcome to Cross-Check API!"}
