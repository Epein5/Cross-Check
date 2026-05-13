from datetime import datetime

from pydantic import BaseModel


class ConnectIntegrationRequest(BaseModel):
    platform: str
    config: dict | None = None


class ConnectIntegrationResponse(BaseModel):
    status: str
    redirect_url: str | None = None
    connection_id: str | None = None
    platform: str


class VerifyConnectionRequest(BaseModel):
    connection_id: str


class VerifyConnectionResponse(BaseModel):
    status: str
    connected_account_id: str | None = None


class IntegrationResponse(BaseModel):
    id: str
    organization_id: str
    platform: str
    enabled: bool
    connection_id: str | None = None
    status: str | None = None
    created_at: datetime | None = None
