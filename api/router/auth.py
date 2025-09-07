from fastapi import APIRouter, Depends

from api.utils.auth import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.get("/me")
def read_me(user=Depends(get_current_user)):
    return {"message": f"Hello, {user['email']}!"}
