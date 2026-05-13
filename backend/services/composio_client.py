from composio import Composio

from core.config import settings

_composio: Composio | None = None


def get_composio() -> Composio:
    global _composio
    if _composio is None:
        _composio = Composio(api_key=settings.composio_api_key)
    return _composio
