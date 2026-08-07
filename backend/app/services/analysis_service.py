"""
Main orchestration service for InsightForge AI.
"""

from collections import defaultdict

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
        owner: str,
        repository: str,
        limit: int = 20,
    ) -> list[dict]:

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

            processed = Preprocessor.preprocess(document)

            embeddings.append(
                EmbeddingService.generate_embedding(
                    processed
                )
            )

        cluster_engine = ClusterEngine()

        labels = cluster_engine.cluster(embeddings)

        grouped = defaultdict(list)

        for label, document in zip(labels, documents):
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

        return results