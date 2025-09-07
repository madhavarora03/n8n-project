import os

from clerk_backend_api import Clerk
from clerk_backend_api.security.types import AuthenticateRequestOptions
from dotenv import load_dotenv
from fastapi import HTTPException, Request

load_dotenv(".env.local")
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")


clerk = Clerk(bearer_auth=CLERK_SECRET_KEY)


async def get_current_user(request: Request):
    request_state = clerk.authenticate_request(
        request,
        AuthenticateRequestOptions(authorized_parties=["http://localhost:3000"]),
    )
    if not request_state.is_signed_in:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return request_state.payload
