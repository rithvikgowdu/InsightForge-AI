from pydantic import BaseModel, Field


class RegisterRequest(BaseModel):
    username: str = Field(
        ...,
        min_length=3,
        max_length=50,
    )

    email: str = Field(
        ...,
        min_length=5,
        max_length=255,
    )

    password: str = Field(
        ...,
        min_length=8,
        max_length=72,
    )


class AuthUserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool

    model_config = {
        "from_attributes": True,
    }

class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str