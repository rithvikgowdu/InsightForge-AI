"""
Transforms complaint summaries into product opportunities.
"""

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

You MUST return ONLY a single valid JSON object.
Do not include Markdown.
Do not include ```json.
Do not include explanations before or after the JSON.
Use double quotes for all JSON keys and string values.
Do not use trailing commas.

The JSON must follow exactly this structure:

{{
  "problem_statement": "string",
  "business_opportunity": "string",
  "ai_solution": "string",
  "target_customers": "string",
  "mvp_features": [
    "string",
    "string",
    "string"
  ],
  "market_potential": "Low",
  "confidence_score": 0.0
}}

Rules:
- market_potential must be exactly one of: Low, Medium, High.
- confidence_score must be a number between 0.0 and 1.0.
- mvp_features must contain exactly 3 strings.
- Return nothing except the JSON object.

Complaint Summary:
{cluster_summary}
"""

        response = ollama.chat(
            model=cls.MODEL_NAME,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            format="json",
        )

        return LLMParser.extract_json(
            response["message"]["content"]
        )