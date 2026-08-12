from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)
from app.database.session import SessionLocal
from app.repositories.user_repository import UserRepository
from app.schemas.auth_schema import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)



router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db),
):
    """
    Register a new user.
    """

    repository = UserRepository(db)

    existing_username = repository.get_by_username(
        request.username
    )

    if existing_username is not None:
        raise HTTPException(
            status_code=400,
            detail="Username already exists",
        )

    existing_email = repository.get_by_email(
        request.email
    )

    if existing_email is not None:
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )

    hashed_password = hash_password(
        request.password
    )

    user = repository.create(
        username=request.username,
        email=request.email,
        hashed_password=hashed_password,
    )

    return user


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    request: LoginRequest,
    db: Session = Depends(get_db),
):
    """
    Authenticate a user and return a JWT access token.
    """

    repository = UserRepository(db)

    user = repository.get_by_username(
        request.username
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )

    if not verify_password(
        request.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="User account is inactive",
        )

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "username": user.username,
        }
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
    )
@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user = Depends(get_current_user),
):
    """
    Return the currently authenticated user.
    """

    return current_user