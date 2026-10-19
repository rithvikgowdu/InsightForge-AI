"""
Standalone test for cluster summarization.
"""

from app.ai.cluster_summarizer import ClusterSummarizer


def main():
    complaints = [
        "VS Code crashes on startup.",
        "Editor freezes while launching.",
        "Application closes immediately after opening.",
        "Startup causes the editor to become unresponsive.",
    ]

    summary = ClusterSummarizer.summarize(
        complaints
    )

    print("=" * 80)
    print("Cluster Summary")
    print("=" * 80)

    print(summary)


if __name__ == "__main__":
    main()