"""
Standalone test for the AI pipeline.
"""

from app.ai.document import Document
from app.ai.embedding_service import EmbeddingService
from app.ai.preprocessing import Preprocessor
from app.connectors.github_connector import GitHubConnector


def main() -> None:
    connector = GitHubConnector()

    issues = connector.fetch_issues(
        owner="microsoft",
        repository="vscode",
        limit=1,
    )

    issue = issues[0]

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

    processed_text = Preprocessor.preprocess(document)

    embedding = EmbeddingService.generate_embedding(
        processed_text
    )

    print("=" * 80)
    print("Embedding Generated Successfully")
    print("=" * 80)

    print(f"Vector Dimension: {len(embedding)}")

    print()

    print("First 10 Values:")

    print(embedding[:10])


if __name__ == "__main__":
    main()