"""
Business logic for user operations.
"""

from app.models.user import User
from app.repositories.user_repository import UserRepository


class UserService:
    """
    Handles business logic related to users.
    """

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def get_user_by_id(self, user_id: int) -> User | None:
        """
        Retrieve a user by ID.
        """
        return self.repository.get_by_id(user_id)

    def get_user_by_email(self, email: str) -> User | None:
        """
        Retrieve a user by email.
        """
        return self.repository.get_by_email(email)

    def get_user_by_username(self, username: str) -> User | None:
        """
        Retrieve a user by username.
        """
        return self.repository.get_by_username(username)

    def get_all_users(self) -> list[User]:
        """
        Retrieve all users.
        """
        return self.repository.get_all()