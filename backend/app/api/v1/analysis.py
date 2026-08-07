from fastapi import APIRouter, HTTPException

from app.schemas.analysis_schema import (
    AnalysisRequest,
    AnalysisResponse,
)
from app.services.analysis_service import AnalysisService

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"],
)


@router.post(
    "",
    response_model=AnalysisResponse,
)
def analyze_repository(
    request: AnalysisRequest,
):
    """
    Analyze a GitHub repository.
    """

    try:

        results = AnalysisService.analyze_repository(
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