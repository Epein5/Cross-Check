from fastapi import FastAPI
from backend.api.v1 import routes

app = FastAPI(title="Cross-Check API")

app.include_router(routes.router, prefix="/api/v1", tags=["v1"])


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Welcome to Cross-Check API!"}

