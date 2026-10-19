
"""
Transforms complaint summaries into product opportunities
and calculates a transparent opportunity score.
"""

import json
import re

import ollama

from app.ai.llm_parser import LLMParser


class OpportunityEngine:
    """
    Generates business opportunities from complaint clusters.
    """

    MODEL_NAME = "llama3.2:3b"

    SEVERITY_KEYWORDS = {
        "critical",
        "crash",
        "crashes",
        "crashing",
        "broken",
        "failure",
        "failed",
        "failing",
        "error",
        "errors",
        "bug",
        "bugs",
        "security",
        "blocker",
        "blocking",
        "unusable",
        "data loss",
        "unavailable",
        "preventing",
        "cannot",
        "unable",
    }

    FREQUENCY_KEYWORDS = {
        "many",
        "multiple",
        "frequent",
        "frequently",
        "repeated",
        "repeatedly",
        "widespread",
        "users",
        "several",
        "numerous",
        "recurring",
        "common",
    }

    @classmethod
    def calculate_opportunity_score(
        cls,
        cluster_summary: str,
        market_potential: str,
    ) -> float:
        """
        Estimate an opportunity score from 0 to 10.

        This is a heuristic based on text signals, not a validated
        measure of market demand.
        """
        text = cluster_summary.lower()

        # Severity score: 0–10.
        severity_matches = sum(
            1
            for keyword in cls.SEVERITY_KEYWORDS
            if keyword in text
        )
        severity_score = min(10.0, 3.0 + severity_matches)

        # Frequency score: 0–10.
        frequency_matches = sum(
            1
            for keyword in cls.FREQUENCY_KEYWORDS
            if re.search(r"\b" + re.escape(keyword) + r"\b", text)
        )
        frequency_score = min(10.0, 3.0 + frequency_matches)

        # Business potential score: 0–10.
        potential_scores = {
            "low": 3.0,
            "medium": 6.0,
            "high": 9.0,
        }
        business_score = potential_scores.get(
            market_potential.strip().lower(),
            3.0,
        )

        score = (
            0.4 * severity_score
            + 0.3 * frequency_score
            + 0.3 * business_score
        )

        return round(max(0.0, min(10.0, score)), 1)

    @classmethod
    def analyze(
        cls,
        cluster_summary: str,
    ) -> dict:
        prompt = f"""
You are an expert Startup Consultant and Product Manager.

Analyze the complaint summary below.

Return ONLY a single valid JSON object.
Do not include Markdown or explanations outside the JSON.

Use this exact structure:

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
  "market_potential": "Medium",
  "confidence_score": 0.0
}}

Rules:
- market_potential must be exactly Low, Medium, or High.
- confidence_score must be a number between 0.0 and 1.0.
- mvp_features must contain exactly 3 strings.
- Base your analysis on the complaint summary.
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

        opportunity = LLMParser.extract_json(
            response["message"]["content"]
        )

        if not isinstance(opportunity, dict):
            raise ValueError(
                "OpportunityEngine expected a JSON object from the LLM."
            )

        market_potential = opportunity.get(
            "market_potential",
            "Low",
        )

        if not isinstance(market_potential, str):
            market_potential = "Low"

        if market_potential.strip().lower() not in {
            "low",
            "medium",
            "high",
        }:
            market_potential = "Low"
        else:
            market_potential = market_potential.strip().capitalize()

        opportunity["market_potential"] = market_potential

        # Confidence remains separate from the opportunity score.
        try:
            confidence = float(
                opportunity.get("confidence_score", 0.0)
            )
        except (TypeError, ValueError):
            confidence = 0.0

        opportunity["confidence_score"] = round(
            max(0.0, min(1.0, confidence)),
            2,
        )

        opportunity["opportunity_score"] = (
            cls.calculate_opportunity_score(
                cluster_summary=cluster_summary,
                market_potential=market_potential,
            )
        )

        return opportunity
