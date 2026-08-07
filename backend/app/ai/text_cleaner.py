"""
Utility functions for cleaning raw text before AI processing.
"""

import re


class TextCleaner:
    """
    Cleans and normalizes text from different data sources.
    """

    URL_PATTERN = re.compile(r"https?://\S+")
    HTML_PATTERN = re.compile(r"<.*?>")
    MULTIPLE_SPACES = re.compile(r"\s+")

    @staticmethod
    def clean(text: str | None) -> str:
        """
        Clean raw text.

        Args:
            text: Raw input text.

        Returns:
            Cleaned text.
        """

        if not text:
            return ""

        # Remove URLs
        text = TextCleaner.URL_PATTERN.sub("", text)

        # Remove HTML tags
        text = TextCleaner.HTML_PATTERN.sub("", text)

        # Replace multiple whitespace with a single space
        text = TextCleaner.MULTIPLE_SPACES.sub(" ", text)

        return text.strip()