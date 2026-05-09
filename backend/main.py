from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from backend.api.v1 import routes

app = FastAPI(title="Cross-Check API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router, prefix="/api/v1", tags=["v1"])


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Welcome to Cross-Check API!"}


def custom_openapi():
    """Configure OpenAPI with HTTP Bearer security scheme for Swagger UI."""
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="Cross-Check API",
        version="1.0.0",
        description="Google OAuth + Supabase authentication",
        routes=app.routes,
    )

    # Add HTTP Bearer security scheme
    openapi_schema["components"]["securitySchemes"] = {
        "HTTPBearer": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": "Google access token from OAuth flow",
        }
    }

    # Mark endpoints that require auth
    for path in openapi_schema["paths"].values():
        for method in path.values():
            if isinstance(method, dict) and method.get("tags") and "v1" in method.get("tags", []):
                # Add security requirement for signout endpoint
                if "/signout" in str(path):
                    method["security"] = [{"HTTPBearer": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

