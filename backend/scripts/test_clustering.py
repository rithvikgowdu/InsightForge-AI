"""
Standalone clustering test.
"""

from app.ai.embedding_service import EmbeddingService
from app.ai.clustering import ClusterEngine


def main():
    texts = [
        "VS Code crashes on startup.",
        "Editor freezes during launch.",
        "Dark mode needs more themes.",
        "Theme colors should improve.",
        "Authentication fails randomly.",
        "Login page throws errors.",
    ]

    embeddings = [
        EmbeddingService.generate_embedding(text)
        for text in texts
    ]

    engine = ClusterEngine()

    labels = engine.cluster(embeddings)

    print("=" * 80)
    print("Clusters")
    print("=" * 80)

    for text, label in zip(texts, labels):
        print(f"[Cluster {label}] {text}")


if __name__ == "__main__":
    main()