"""
Database initialization.
"""

from app.database.base import Base
from app.database.session import engine

# Import all models so they are registered with SQLAlchemy
from app.models import User


def init_db() -> None:
    """
    Create all database tables.
    """
    Base.metadata.create_all(bind=engine)