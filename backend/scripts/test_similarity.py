"""
Standalone test for cosine similarity.
"""

from app.ai.embedding_service import EmbeddingService
from app.ai.similarity import Similarity


def main() -> None:
    text_a = "VS Code crashes on startup."

    text_b = "Editor crashes while launching."

    embedding_a = EmbeddingService.generate_embedding(text_a)
    embedding_b = EmbeddingService.generate_embedding(text_b)

    score = Similarity.cosine_similarity(
        embedding_a,
        embedding_b,
    )

    print("=" * 80)
    print("Similarity Test")
    print("=" * 80)

    print(f"Similarity Score : {score:.4f}")

    print(
        f"Duplicate? {Similarity.is_duplicate(score)}"
    )


if __name__ == "__main__":
    main()