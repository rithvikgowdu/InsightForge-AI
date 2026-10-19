"""
Cluster summarization using Ollama.
"""

import ollama


class ClusterSummarizer:
    """
    Uses an LLM to summarize complaint clusters.
    """

    MODEL_NAME = "llama3.2:3b"

    @classmethod
    def summarize(
        cls,
        complaints: list[str],
    ) -> str:
        """
        Generate a concise summary for a complaint cluster.
        """

        prompt = f"""
You are an expert Product Manager.

Below are several user complaints that belong to the same semantic cluster.

Tasks:

1. Give the cluster a short title.
2. Summarize the common problem.
3. Mention possible causes if obvious.

Complaints:

{chr(10).join(complaints)}

Respond in this format:

Title:
...

Summary:
...

Possible Causes:
...
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

        return response["message"]["content"]