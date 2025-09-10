import os

from clerk_backend_api import Clerk
from clerk_backend_api.security.types import AuthenticateRequestOptions
from fastapi import HTTPException, Request

from api.core.config import settings

clerk = Clerk(bearer_auth=settings.CLERK_SECRET_KEY)


async def get_current_user(request: Request):
    """Get the current authenticated user from the request using Clerk."""
    request_state = clerk.authenticate_request(
        request,
        AuthenticateRequestOptions(
            authorized_parties=[
                "https://n8n-project-alpha.vercel.app",
                "http://localhost:3000",
            ],
        ),
    )

    if not request_state.is_signed_in:
        raise HTTPException(status_code=401, detail="Unauthorized")

    return request_state.payload["sub"]  # type: ignore
