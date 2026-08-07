"""
Vector store implementation using ChromaDB.
"""

import chromadb


class VectorStore:
    """
    Wrapper around ChromaDB.
    """

    COLLECTION_NAME = "insightforge_documents"

    def __init__(self):
        self.client = chromadb.Client()

        self.collection = self.client.get_or_create_collection(
            name=self.COLLECTION_NAME
        )

    def add_document(
        self,
        document_id: str,
        text: str,
        embedding: list[float],
    ) -> None:
        """
        Store a document and its embedding.
        """

        self.collection.add(
            ids=[document_id],
            documents=[text],
            embeddings=[embedding],
        )

    def search(
        self,
        embedding: list[float],
        top_k: int = 5,
    ):
        """
        Search for similar documents.
        """

        return self.collection.query(
            query_embeddings=[embedding],
            n_results=top_k,
        )