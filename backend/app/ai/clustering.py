"""
Document clustering using HDBSCAN.
"""

import hdbscan


class ClusterEngine:
    """
    Groups similar embedding vectors.
    """

    def __init__(
        self,
        min_cluster_size: int = 2,
    ):
        self.clusterer = hdbscan.HDBSCAN(
            min_cluster_size=min_cluster_size,
            metric="euclidean",
        )

    def cluster(
        self,
        embeddings: list[list[float]],
    ) -> list[int]:
        """
        Cluster embedding vectors.

        Returns:
            Cluster labels.
            -1 means noise.
        """

        labels = self.clusterer.fit_predict(
            embeddings
        )

        return labels.tolist()