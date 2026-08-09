"""
Test persistent ChromaDB storage.
"""

from app.ai.embedding_service import EmbeddingService
from app.ai.vector_store import VectorStore


DOCUMENT_ID = "persistent-test-1"
TEXT = "This document should survive a server restart."


def main():
    print("=" * 80)
    print("Persistent Vector Store Test")
    print("=" * 80)

    store = VectorStore()

    embedding = EmbeddingService.generate_embedding(TEXT)

    store.add_document(
        document_id=DOCUMENT_ID,
        text=TEXT,
        embedding=embedding,
    )

    print("\nDocument stored.")

    results = store.search(
        embedding=embedding,
        top_k=1,
    )

    print("\nSearch result:")
    print(results)

    if results["ids"][0]:
        print("\n✅ Document successfully stored in ChromaDB.")

    else:
        print("\n❌ Document was not found.")


if __name__ == "__main__":
    main()