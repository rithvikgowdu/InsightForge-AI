"""
User API endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database.session import get_db
from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserResponse
from app.services.user_service import UserService


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get(
    "/",
    response_model=list[UserResponse],
    summary="Get all users",
)
def get_users(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    repository = UserRepository(db)
    service = UserService(repository)

    return service.get_all_users()


@router.get(
    "/{user_id}",
    response_model=UserResponse,
    summary="Get user by ID",
)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    repository = UserRepository(db)
    service = UserService(repository)

    user = service.get_user_by_id(user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user