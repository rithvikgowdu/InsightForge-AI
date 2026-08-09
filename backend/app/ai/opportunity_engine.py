"""
Transforms complaint summaries into product opportunities.
"""

import json
import ollama
from app.ai.llm_parser import LLMParser



class OpportunityEngine:
    """
    Generates business opportunities from complaint clusters.
    """

    MODEL_NAME = "llama3.2:3b"

    @classmethod
    def analyze(
        cls,
        cluster_summary: str,
    ) -> dict:
        prompt = f"""
You are an expert Startup Consultant and Product Manager.

Analyze the complaint summary below.

Return ONLY valid JSON.

Complaint Summary:

{cluster_summary}

Return exactly this structure:

{{
  "problem_statement": "...",
  "business_opportunity": "...",
  "ai_solution": "...",
  "target_customers": "...",
  "mvp_features": [
      "...",
      "...",
      "..."
  ],
  "market_potential": "Low | Medium | High",
  "confidence_score": 0.0
}}
"""

        response = ollama.chat(
            model=cls.MODEL_NAME,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        return LLMParser.extract_json(
            response["message"]["content"]
        )