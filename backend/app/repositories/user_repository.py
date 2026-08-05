"""
Repository for user database operations.
"""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:
    """
    Handles all database operations related to users.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: int) -> User | None:
        """
        Get a user by ID.
        """
        statement = select(User).where(User.id == user_id)
        return self.db.scalar(statement)

    def get_by_email(self, email: str) -> User | None:
        """
        Get a user by email.
        """
        statement = select(User).where(User.email == email)
        return self.db.scalar(statement)

    def get_by_username(self, username: str) -> User | None:
        """
        Get a user by username.
        """
        statement = select(User).where(User.username == username)
        return self.db.scalar(statement)

    def get_all(self) -> list[User]:
        """
        Return all users.
        """
        statement = select(User)
        return list(self.db.scalars(statement).all())