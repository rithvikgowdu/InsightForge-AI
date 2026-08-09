from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.repositories.analysis_repository import AnalysisRepository
from app.schemas.analysis_history_schema import AnalysisHistoryResponse
from app.schemas.analysis_schema import (
    AnalysisRequest,
    AnalysisResponse,
)
from app.services.analysis_service import AnalysisService
from app.tasks.analysis_task import run_analysis


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
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Start analysis of a GitHub repository.
    """

    analysis = AnalysisRepository.create(
        db=db,
        repository=f"{request.owner}/{request.repository}",
        status="pending",
        total_clusters=0,
        results={},
    )

    background_tasks.add_task(
        run_analysis,
        analysis_id=analysis.id,
        owner=request.owner,
        repository=request.repository,
        limit=request.limit,
    )

    return AnalysisResponse(
        id=analysis.id,
        repository=f"{request.owner}/{request.repository}",
        status=analysis.status,
        total_clusters=0,
        results=[],
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