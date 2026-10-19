"""
Test password hashing and JWT security utilities.
"""

from app.core.security import (
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)


def main():
    password = "TestPassword123!"

    # Test password hashing
    hashed_password = hash_password(password)

    print("=" * 80)
    print("Security Layer Test")
    print("=" * 80)

    print("\nOriginal password:")
    print(password)

    print("\nHashed password:")
    print(hashed_password)

    # Verify correct password
    valid = verify_password(
        password,
        hashed_password,
    )

    print("\nCorrect password verification:")
    print(valid)

    # Verify incorrect password
    invalid = verify_password(
        "WrongPassword123!",
        hashed_password,
    )

    print("\nIncorrect password verification:")
    print(invalid)

    # Test JWT creation
    token = create_access_token(
        {
            "sub": "test-user-1",
        }
    )

    print("\nJWT token:")
    print(token)

    # Test JWT decoding
    payload = decode_access_token(token)

    print("\nDecoded JWT payload:")
    print(payload)

    print("\n" + "=" * 80)

    if (
        valid
        and not invalid
        and payload is not None
        and payload.get("sub") == "test-user-1"
    ):
        print("✅ Security layer working.")
    else:
        print("❌ Security layer test failed.")


if __name__ == "__main__":
    main()