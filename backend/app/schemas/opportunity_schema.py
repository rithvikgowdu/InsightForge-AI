from typing import Literal

from pydantic import BaseModel, Field


class OpportunitySchema(BaseModel):
    problem_statement: str
    business_opportunity: str
    ai_solution: str
    target_customers: str
    mvp_features: list[str]
    market_potential: Literal["Low", "Medium", "High"]
    confidence_score: float = Field(
        ge=0.0,
        le=1.0,
    )