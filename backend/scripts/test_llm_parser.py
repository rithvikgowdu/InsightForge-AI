"""
Standalone test for the LLM parser.
"""

from app.ai.llm_parser import LLMParser


def main():
    sample = """
```json
{
    "market_potential": "High",
    "confidence_score": 0.92
}
"""

    parsed = LLMParser.extract_json(sample)

    print("=" * 80)
    print("LLM Parser Test")
    print("=" * 80)

    print(parsed)

if __name__ == "__main__":
    main()