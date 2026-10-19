import ollama

response = ollama.chat(
    model="llama3.2:3b",
    messages=[
        {
            "role": "user",
            "content": """
Return ONLY valid JSON.

Use exactly this structure:

{
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
  "confidence_score": 0.8
}

Complaint:
Users frequently report difficulty finding and managing relevant issues in the repository.
""",
        }
    ],
    format="json",
)

print(response["message"]["content"])