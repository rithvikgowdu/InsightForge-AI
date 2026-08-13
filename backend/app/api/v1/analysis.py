from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database.session import SessionLocal
from app.repositories.analysis_repository import AnalysisRepository
from app.schemas.analysis_history_schema import (
    AnalysisHistoryResponse,
    AnalysisStatusResponse,
)
from app.schemas.analysis_schema import (
    AnalysisRequest,
    AnalysisResponse,
)
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
    current_user=Depends(get_current_user),
):
    """
    Start analysis of a GitHub repository.
    """

    analysis = AnalysisRepository.create(
        db=db,
        user_id=current_user.id,
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
    current_user=Depends(get_current_user),
):
    """
    Return recent analysis runs.
    """

    return AnalysisRepository.get_recent(
        db=db,
        user_id=current_user.id,
        limit=10,
    )


@router.get(
    "/{analysis_id}/status",
    response_model=AnalysisStatusResponse,
)
def get_analysis_status(
    analysis_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Return the current status of an analysis run.
    """

    analysis = AnalysisRepository.get_by_id_for_user(
        db=db,
        analysis_id=analysis_id,
        user_id=current_user.id,
    )

    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found",
        )

    return analysis


@router.get(
    "/{analysis_id}",
    response_model=AnalysisHistoryResponse,
)
def get_analysis(
    analysis_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Return a single analysis run.
    """

    analysis = AnalysisRepository.get_by_id_for_user(
        db=db,
        analysis_id=analysis_id,
        user_id=current_user.id,
    )

    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found",
        )

    return analysis