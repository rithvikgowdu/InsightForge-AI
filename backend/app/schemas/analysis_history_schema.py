from datetime import datetime

from pydantic import BaseModel


class AnalysisHistoryResponse(BaseModel):
    id: int
    repository: str
    status: str
    total_clusters: int
    results: dict
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }


class AnalysisStatusResponse(BaseModel):
    id: int
    repository: str
    status: str
    total_clusters: int

    model_config = {
        "from_attributes": True,
    }