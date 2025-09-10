from fastapi import APIRouter, Depends

from api.core.clerk import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.get("/me")
def read_me(user_id=Depends(get_current_user)):
    """Endpoint to get the current authenticated user's ID."""
    return {"message": f"User is logged in", "user_id": user_id}
