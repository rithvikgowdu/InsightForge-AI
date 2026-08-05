from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Base declarative class for all SQLAlchemy ORM models.

    Every database model in the application should inherit from this class.
    """

    pass