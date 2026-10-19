from sqlalchemy.orm import Session

from app.models.analysis import Analysis


class AnalysisRepository:
    """
    Handles database operations for analysis runs.
    """

    @staticmethod
    def create(
        db: Session,
        user_id: int,
        repository: str,
        status: str,
        total_clusters: int,
        results: dict,
    ) -> Analysis:

        analysis = Analysis(
            user_id=user_id,
            repository=repository,
            status=status,
            total_clusters=total_clusters,
            results=results,
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

        return analysis

    @staticmethod
    def get_by_id(
        db: Session,
        analysis_id: int,
    ) -> Analysis | None:

        return (
            db.query(Analysis)
            .filter(Analysis.id == analysis_id)
            .first()
        )

    @staticmethod
    def get_by_id_for_user(
        db: Session,
        analysis_id: int,
        user_id: int,
    ) -> Analysis | None:

        return (
            db.query(Analysis)
            .filter(
                Analysis.id == analysis_id,
                Analysis.user_id == user_id,
            )
            .first()
        )

    @staticmethod
    def get_recent(
        db: Session,
        user_id: int,
        limit: int = 10,
    ) -> list[Analysis]:

        return (
            db.query(Analysis)
            .filter(Analysis.user_id == user_id)
            .order_by(Analysis.created_at.desc())
            .limit(limit)
            .all()
        )

    @staticmethod
    def update_status(
        db: Session,
        analysis_id: int,
        status: str,
    ) -> Analysis | None:

        analysis = (
            db.query(Analysis)
            .filter(Analysis.id == analysis_id)
            .first()
        )

        if analysis is None:
            return None

        analysis.status = status

        db.commit()
        db.refresh(analysis)

        return analysis