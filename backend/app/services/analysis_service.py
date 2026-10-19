
"""
Main orchestration service for InsightForge AI.
"""

import logging
from collections import defaultdict
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.repositories.analysis_repository import AnalysisRepository
from app.ai.clustering import ClusterEngine
from app.ai.cluster_summarizer import ClusterSummarizer
from app.ai.document import Document
from app.ai.embedding_service import EmbeddingService
from app.ai.opportunity_engine import OpportunityEngine
from app.ai.preprocessing import Preprocessor
from app.connectors.github_connector import GitHubConnector

logger = logging.getLogger(__name__)


class AnalysisService:
    """Coordinates the complete AI analysis pipeline."""

    SEVERITY_KEYWORDS = (
        "crash",
        "broken",
        "failure",
        "error",
        "bug",
        "critical",
        "security",
        "blocker",
    )

    GROWTH_WINDOW_DAYS = 30

    @classmethod
    def calculate_pain_score(cls, docs: list[Document]) -> float:
        """Estimate cluster pain on a 0-10 heuristic scale."""
        if not docs:
            return 0.0

        severity_scores = []
        comment_counts = []

        for doc in docs:
            text = f"{doc.title} {doc.content}".lower()
            labels = doc.metadata.get("labels", [])
            label_text = " ".join(str(label) for label in labels).lower()

            severity = (
                8.0
                if any(
                    keyword in text or keyword in label_text
                    for keyword in cls.SEVERITY_KEYWORDS
                )
                else 3.0
            )
            severity_scores.append(severity)

            try:
                comments = max(0, int(doc.metadata.get("comments", 0) or 0))
            except (TypeError, ValueError):
                comments = 0

            comment_counts.append(comments)

        avg_severity = sum(severity_scores) / len(severity_scores)
        frequency_score = min(len(docs) / 10, 1.0) * 10
        avg_comments = sum(comment_counts) / len(comment_counts)
        engagement_score = min(avg_comments / 10, 1.0) * 10

        score = (
            0.5 * avg_severity
            + 0.3 * frequency_score
            + 0.2 * engagement_score
        )

        return round(max(0.0, min(10.0, score)), 1)

    @staticmethod
    def _parse_created_at(value) -> datetime | None:
        """Parse an issue creation timestamp into UTC."""
        if isinstance(value, datetime):
            parsed = value
        elif isinstance(value, str) and value.strip():
            try:
                parsed = datetime.fromisoformat(
                    value.strip().replace("Z", "+00:00")
                )
            except ValueError:
                return None
        else:
            return None

        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)

        return parsed.astimezone(timezone.utc)

    @classmethod
    def calculate_growth(
        cls,
        cluster_docs: list[Document],
        reference_time: datetime,
    ) -> float | None:
        """
        Compare issue counts in two equal 30-day windows.

        Returns percentage growth, or None when the available data
        cannot support a meaningful comparison.
        """
        window = timedelta(days=cls.GROWTH_WINDOW_DAYS)
        current_start = reference_time - window
        previous_start = current_start - window

        current_count = 0
        previous_count = 0

        for doc in cluster_docs:
            created_at = cls._parse_created_at(
                getattr(doc, "created_at", None)
            )

            if created_at is None:
                continue

            if current_start <= created_at <= reference_time:
                current_count += 1
            elif previous_start <= created_at < current_start:
                previous_count += 1

        # No comparable baseline means growth is undefined.
        if previous_count == 0:
            return None

        growth = (
            (current_count - previous_count)
            / previous_count
        ) * 100

        return round(growth, 1)

    @classmethod
    def analyze_repository(
        cls,
        db: Session,
        analysis_id: int,
        owner: str,
        repository: str,
        limit: int = 20,
    ) -> list[dict]:
        analysis = AnalysisRepository.get_by_id(
            db=db,
            analysis_id=analysis_id,
        )

        if analysis is None:
            raise ValueError("Analysis record not found.")

        AnalysisRepository.update_status(
            db=db,
            analysis_id=analysis.id,
            status="running",
        )

        try:
            logger.info(
                "Starting analysis %s for %s/%s",
                analysis_id,
                owner,
                repository,
            )

            connector = GitHubConnector()
            issues = connector.fetch_issues(
                owner=owner,
                repository=repository,
                limit=limit,
            )

            logger.info(
                "Fetched %s GitHub issues for %s/%s",
                len(issues),
                owner,
                repository,
            )

            documents = []
            embeddings = []

            for issue in issues:
                document = Document(
                    source="github",
                    source_id=str(issue["id"]),
                    title=issue["title"],
                    content=issue["body"] or "",
                    url=issue["url"],
                    created_at=issue["created_at"],
                    metadata={
                        "labels": issue["labels"],
                        "comments": issue["comments"],
                    },
                )

                documents.append(document)

                processed = Preprocessor.preprocess(document)
                embedding = EmbeddingService.generate_embedding(processed)
                embeddings.append(embedding)

            if not documents:
                raise ValueError(
                    "GitHub returned no issues for this repository."
                )

            logger.info("Generated %s embeddings", len(embeddings))

            valid_dates = [
                parsed
                for doc in documents
                if (
                    parsed := cls._parse_created_at(
                        getattr(doc, "created_at", None)
                    )
                ) is not None
            ]

            # Use the latest issue timestamp as the reference point so
            # results are reproducible for the fetched dataset.
            reference_time = max(valid_dates) if valid_dates else None

            cluster_engine = ClusterEngine()
            labels = cluster_engine.cluster(embeddings)

            grouped = defaultdict(list)

            for label, document in zip(labels, documents):
                if label == -1:
                    continue
                grouped[label].append(document)

            results = []

            for cluster_id, docs in grouped.items():
                complaints = [doc.title for doc in docs]
                summary = ClusterSummarizer.summarize(complaints)
                opportunity = OpportunityEngine.analyze(summary)
                pain_score = cls.calculate_pain_score(docs)

                growth = (
                    cls.calculate_growth(docs, reference_time)
                    if reference_time is not None
                    else None
                )

                results.append(
                    {
                        "cluster": int(cluster_id),
                        "documents": len(docs),
                        "summary": summary,
                        "pain_score": pain_score,
                        "growth": growth,
                        "opportunity": opportunity,
                    }
                )

            analysis.status = "completed"
            analysis.total_clusters = len(results)
            analysis.results = {"clusters": results}

            db.commit()
            db.refresh(analysis)

            logger.info(
                "Analysis %s completed with %s clusters",
                analysis_id,
                len(results),
            )

            return results

        except Exception:
            logger.exception(
                "Analysis %s failed for %s/%s",
                analysis_id,
                owner,
                repository,
            )

            db.rollback()

            AnalysisRepository.update_status(
                db=db,
                analysis_id=analysis.id,
                status="failed",
            )

            raise
