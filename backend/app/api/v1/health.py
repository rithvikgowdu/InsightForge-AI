from fastapi import APIRouter
from sqlalchemy import text

from app.database.session import SessionLocal


router = APIRouter()


@router.get("/health")
def health():
    return {
        "status": "healthy"
    }


@router.get("/health/ready")
def readiness():
    db = SessionLocal()

    try:
        db.execute(text("SELECT 1"))

        return {
            "status": "ready",
            "database": "connected",
        }

    except Exception:
        return {
            "status": "not_ready",
            "database": "disconnected",
        }

    finally:
        db.close()