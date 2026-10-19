"""
Document preprocessing pipeline.
"""

from app.ai.document import Document
from app.ai.text_cleaner import TextCleaner


class Preprocessor:
    """
    Prepares documents for AI models.
    """

    @staticmethod
    def preprocess(document: Document) -> str:
        """
        Convert a Document into cleaned text suitable
        for embeddings and NLP models.
        """

        title = TextCleaner.clean(document.title)
        content = TextCleaner.clean(document.content)

        combined = f"{title}\n\n{content}"

        return combined.strip()