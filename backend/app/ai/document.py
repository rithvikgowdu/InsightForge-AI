"""
Canonical document model used throughout the AI pipeline.
"""

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class Document(BaseModel):
    """
    Standard document format used by all connectors.
    """

    source: str = Field(
        ...,
        description="Source of the document (github, reddit, hackernews, etc.)",
    )

    source_id: str = Field(
        ...,
        description="Unique identifier from the source platform.",
    )

    title: str = Field(
        ...,
        description="Document title.",
    )

    content: str = Field(
        ...,
        description="Main body text.",
    )

    url: str = Field(
        ...,
        description="Original URL.",
    )

    created_at: datetime = Field(
        ...,
        description="Original creation time.",
    )

    metadata: dict[str, Any] = Field(
        default_factory=dict,
        description="Additional source-specific metadata.",
    )