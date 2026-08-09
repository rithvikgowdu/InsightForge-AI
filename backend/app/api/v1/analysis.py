from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.repositories.analysis_repository import AnalysisRepository
from app.schemas.analysis_history_schema import AnalysisHistoryResponse
from app.schemas.analysis_schema import (
    AnalysisRequest,
    AnalysisResponse,
)
from app.services.analysis_service import AnalysisService


router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post(
    "",
    response_model=AnalysisResponse,
)
def analyze_repository(
    request: AnalysisRequest,
    db: Session = Depends(get_db),
):
    """
    Analyze a GitHub repository.
    """

    try:
        results = AnalysisService.analyze_repository(
            db=db,
            owner=request.owner,
            repository=request.repository,
            limit=request.limit,
        )

        return AnalysisResponse(
            repository=f"{request.owner}/{request.repository}",
            total_clusters=len(results),
            results=results,
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get(
    "/history",
    response_model=list[AnalysisHistoryResponse],
)
def get_analysis_history(
    db: Session = Depends(get_db),
):
    """
    Return recent analysis runs.
    """

    return AnalysisRepository.get_recent(
        db=db,
        limit=10,
    )
@router.get(
    "/{analysis_id}",
    response_model=AnalysisHistoryResponse,
)
def get_analysis(
    analysis_id: int,
    db: Session = Depends(get_db),
):
    """
    Return a single analysis run.
    """

    analysis = AnalysisRepository.get_by_id(
        db=db,
        analysis_id=analysis_id,
    )

    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found",
        )

    return analysis