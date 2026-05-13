from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import routes
from core.config import settings


def _init_composio():
    try:
        from services.composio_client import get_composio
        c = get_composio()

        existing = {item.toolkit.slug: item for item in c.auth_configs.list().items}

        if "databricks" not in existing:
            from composio_client.types.auth_config_create_params import AuthConfigUnionMember1
            c.auth_configs.create(
                "databricks",
                AuthConfigUnionMember1(
                    type="use_custom_auth",
                    auth_scheme="API_KEY",
                    name="cross-check-databricks",
                ),
            )
            print("Created Databricks API_KEY auth config")

        if settings.composio_auth_config_snowflake:
            sf_id = settings.composio_auth_config_snowflake
            if sf_id not in {item.id for item in existing.values()}:
                print(f"Warning: Snowflake OAuth auth config {sf_id} not found")

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
