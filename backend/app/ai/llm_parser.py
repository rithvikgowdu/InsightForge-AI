"""
Utility functions for parsing LLM responses safely.
"""

import json
import re


class LLMParser:
    """
    Parses and validates LLM responses.
    """

    @staticmethod
    def extract_json(text: str) -> dict:
        """
        Extract JSON from an LLM response.

        Supports:
        - Raw JSON
        - ```json fenced blocks
        - Text surrounding JSON
        """

        text = text.strip()

        # Remove Markdown code fences
        text = re.sub(r"^```json\s*", "", text, flags=re.IGNORECASE)
        text = re.sub(r"^```", "", text)
        text = re.sub(r"```$", "", text)

        # Try parsing directly
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            pass

        # Extract the first JSON object
        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            return json.loads(match.group())

        raise ValueError("No valid JSON found in LLM response.")