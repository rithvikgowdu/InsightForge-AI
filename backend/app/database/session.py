"""
Database engine and session management.
"""

from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

# Create the SQLAlchemy engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
)

# Create a session factory
SessionLocal = sessionmaker(
    bind=engine,
    class_=Session,
    autoflush=False,
    autocommit=False,
)

def get_db() -> Generator[Session, None, None]:
    """
    Provide a database session for each request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()