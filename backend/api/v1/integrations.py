from fastapi import APIRouter, Depends
from supabase import Client

from core.security import security, verify_bearer_token
from schemas.integrations import (
    ConnectIntegrationRequest,
    ConnectIntegrationResponse,
    IntegrationResponse,
    VerifyConnectionRequest,
    VerifyConnectionResponse,
)
from services.integrations import (
    initiate_connection,
    list_integrations,
    remove_integration,
    verify_connection,
)
from supabase_client import get_supabase

router = APIRouter()


@router.post(
    "/organizations/{org_id}/integrations/connect",
    response_model=ConnectIntegrationResponse,
)
async def connect_integration(
    org_id: str,
    body: ConnectIntegrationRequest,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    redirect_url, connection_id, flow_type = initiate_connection(
        org_id, body.platform, body.config, supabase
    )
    return ConnectIntegrationResponse(
        status="connected" if flow_type == "connected" else "redirect",
        redirect_url=redirect_url,
        connection_id=connection_id,
        platform=body.platform,
    )


@router.post(
    "/organizations/{org_id}/integrations/verify",
    response_model=VerifyConnectionResponse,
)
async def verify_integration(
    org_id: str,
    body: VerifyConnectionRequest,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    status, connected_id = verify_connection(body.connection_id)
    return VerifyConnectionResponse(
        status=status,
        connected_account_id=connected_id,
    )


@router.get(
    "/organizations/{org_id}/integrations",
    response_model=list[IntegrationResponse],
)
async def list_org_integrations(
    org_id: str,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    return list_integrations(org_id, supabase)


@router.delete(
    "/organizations/{org_id}/integrations/{integration_id}",
    status_code=204,
)
async def delete_integration(
    org_id: str,
    integration_id: str,
    credentials=Depends(security),
    supabase: Client = Depends(get_supabase),
):
    user = await verify_bearer_token(credentials)
    remove_integration(org_id, integration_id, supabase)
