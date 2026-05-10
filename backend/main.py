from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.v1 import routes
from backend.core.config import settings

app = FastAPI(title="Cross-Check API")

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
