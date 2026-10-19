
from pydantic import BaseModel, Field


class AnalysisRequest(BaseModel):
    owner: str = Field(..., example="microsoft")
    repository: str = Field(..., example="vscode")
    limit: int = Field(default=20, ge=1, le=100)


class ClusterResult(BaseModel):
    cluster: int
    documents: int
    summary: str
    pain_score: float = Field(..., ge=0.0, le=10.0)
    opportunity: dict


class AnalysisResponse(BaseModel):
    id: int
    repository: str
    status: str
    total_clusters: int
    results: list[ClusterResult]
