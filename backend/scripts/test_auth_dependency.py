"""
Test JWT authentication dependency.
"""

from app.core.security import (
    create_access_token,
    get_current_user,
)
from fastapi.security import HTTPAuthorizationCredentials


def main():
    print("=" * 80)
    print("Authentication Dependency Test")
    print("=" * 80)

    user_id = 5

    token = create_access_token(
        {
            "sub": str(user_id),
            "username": "qwerty",
        }
    )

    credentials = HTTPAuthorizationCredentials(
        scheme="Bearer",
        credentials=token,
    )

    user = get_current_user(
        credentials=credentials,
    )

    print("\nAuthenticated user:")
    print(f"ID: {user.id}")
    print(f"Username: {user.username}")
    print(f"Email: {user.email}")
    print(f"Active: {user.is_active}")

    assert user.id == user_id
    assert user.username == "qwerty"
    assert user.is_active is True

    print("\n✅ Authentication dependency working.")


if __name__ == "__main__":
    main()