"""
Utility functions for vector similarity.
"""

from math import sqrt


class Similarity:
    """
    Similarity calculations for embedding vectors.
    """

    @staticmethod
    def cosine_similarity(
        vector_a: list[float],
        vector_b: list[float],
    ) -> float:
        """
        Calculate cosine similarity between two vectors.
        """

        if len(vector_a) != len(vector_b):
            raise ValueError("Vectors must have the same dimension.")

        dot_product = sum(
            a * b
            for a, b in zip(vector_a, vector_b)
        )

        magnitude_a = sqrt(
            sum(a * a for a in vector_a)
        )

        magnitude_b = sqrt(
            sum(b * b for b in vector_b)
        )

        if magnitude_a == 0 or magnitude_b == 0:
            return 0.0

        return dot_product / (
            magnitude_a * magnitude_b
        )

    @staticmethod
    def is_duplicate(
        similarity_score: float,
        threshold: float = 0.90,
    ) -> bool:
        """
        Determine whether two documents should
        be treated as duplicates.
        """

        return similarity_score >= threshold