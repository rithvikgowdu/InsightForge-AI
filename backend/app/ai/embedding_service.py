"""
Embedding service using Ollama.
"""

import ollama


class EmbeddingService:
    """
    Generates embeddings using Ollama.
    """

    MODEL_NAME = "nomic-embed-text"

    @classmethod
    def generate_embedding(
        cls,
        text: str,
    ) -> list[float]:
        """
        Generate an embedding vector for the given text.
        """

        response = ollama.embed(
            model=cls.MODEL_NAME,
            input=text,
        )

        return response["embeddings"][0]