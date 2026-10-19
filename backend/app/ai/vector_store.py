"""
Persistent vector store implementation using ChromaDB.
"""

from pathlib import Path

import chromadb


class VectorStore:
    """
    Persistent wrapper around ChromaDB.
    """

    COLLECTION_NAME = "insightforge_documents"

    def __init__(
        self,
        persist_directory: str = "data/chroma",
    ):
        project_root = Path(__file__).resolve().parents[3]

        storage_path = project_root / persist_directory

        storage_path.mkdir(
            parents=True,
            exist_ok=True,
        )

        self.client = chromadb.PersistentClient(
            path=str(storage_path)
        )

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

        self.collection.upsert(
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