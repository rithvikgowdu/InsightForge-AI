"""
Database initialization.
"""

from app.database.base import Base
from app.database.session import engine
from app.models.analysis import Analysis

# Import all models so they are registered with SQLAlchemy
from app.models.user import User


def init_db() -> None:
    """
    Create all database tables.
    """
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()