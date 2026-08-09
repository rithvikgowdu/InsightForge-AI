"""
Background task for repository analysis.
"""

from app.database.session import SessionLocal
from app.repositories.analysis_repository import AnalysisRepository
from app.services.analysis_service import AnalysisService


def run_analysis(
    analysis_id: int,
    owner: str,
    repository: str,
    limit: int = 20,
):
    """
    Run repository analysis in the background.
    """

    db = SessionLocal()

    try:
        AnalysisService.analyze_repository(
            db=db,
            analysis_id=analysis_id,
            owner=owner,
            repository=repository,
            limit=limit,
        )

    finally:
        db.close()