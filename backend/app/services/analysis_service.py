"""
Main orchestration service for InsightForge AI.
"""

from collections import defaultdict

from sqlalchemy.orm import Session

from app.repositories.analysis_repository import AnalysisRepository
from app.ai.clustering import ClusterEngine
from app.ai.cluster_summarizer import ClusterSummarizer
from app.ai.document import Document
from app.ai.embedding_service import EmbeddingService
from app.ai.opportunity_engine import OpportunityEngine
from app.ai.preprocessing import Preprocessor
from app.connectors.github_connector import GitHubConnector


class AnalysisService:
    """
    Coordinates the complete AI analysis pipeline.
    """

    @classmethod
    def analyze_repository(
        cls,
        db: Session,
        owner: str,
        repository: str,
        limit: int = 20,
    ) -> list[dict]:

        # Create an analysis record before starting the pipeline
        analysis = AnalysisRepository.create(
            db=db,
            repository=f"{owner}/{repository}",
            status="pending",
            total_clusters=0,
            results={},
        )

        # Mark the analysis as running
        AnalysisRepository.update_status(
            db=db,
            analysis_id=analysis.id,
            status="running",
        )

        try:
            connector = GitHubConnector()

            issues = connector.fetch_issues(
                owner=owner,
                repository=repository,
                limit=limit,
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

                processed = Preprocessor.preprocess(
                    document
                )

                embeddings.append(
                    EmbeddingService.generate_embedding(
                        processed
                    )
                )

            cluster_engine = ClusterEngine()

            labels = cluster_engine.cluster(
                embeddings
            )

            grouped = defaultdict(list)

            for label, document in zip(
                labels,
                documents,
            ):
                if label == -1:
                    continue

                grouped[label].append(document)

            results = []

            for cluster_id, docs in grouped.items():

                complaints = [
                    doc.title
                    for doc in docs
                ]

                summary = ClusterSummarizer.summarize(
                    complaints
                )

                opportunity = OpportunityEngine.analyze(
                    summary
                )

                results.append(
                    {
                        "cluster": cluster_id,
                        "documents": len(docs),
                        "summary": summary,
                        "opportunity": opportunity,
                    }
                )

            # Update the existing analysis record
            analysis.status = "completed"
            analysis.total_clusters = len(results)
            analysis.results = {
                "clusters": results,
            }

            db.commit()
            db.refresh(analysis)

            return results

        except Exception:
            # Mark the same analysis record as failed
            AnalysisRepository.update_status(
                db=db,
                analysis_id=analysis.id,
                status="failed",
            )

            raise