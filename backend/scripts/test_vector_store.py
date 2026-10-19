"""
Standalone semantic search test.
"""

from app.ai.embedding_service import EmbeddingService
from app.ai.vector_store import VectorStore


def main() -> None:
    store = VectorStore()

    documents = [
        (
            "1",
            "VS Code crashes when opening terminal.",
        ),
        (
            "2",
            "Dark mode should support more color themes.",
        ),
        (
            "3",
            "The editor freezes during startup.",
        ),
    ]

    # Store all documents
    for document_id, text in documents:
        embedding = EmbeddingService.generate_embedding(text)

        try:
            store.add_document(
                document_id=document_id,
                text=text,
                embedding=embedding,
            )
        except Exception:
            # Ignore duplicates if the script is run multiple times
            pass

    print("=" * 80)
    print("Semantic Search")
    print("=" * 80)

    query = "Editor crashes while starting."

    query_embedding = EmbeddingService.generate_embedding(query)

    results = store.search(
        embedding=query_embedding,
        top_k=3,
    )

    ids = results["ids"][0]
    docs = results["documents"][0]
    distances = results["distances"][0]

    for i in range(len(ids)):
        print(f"Rank {i + 1}")
        print(f"ID       : {ids[i]}")
        print(f"Distance : {distances[i]:.4f}")
        print(f"Document : {docs[i]}")
        print("-" * 80)


if __name__ == "__main__":
    main()