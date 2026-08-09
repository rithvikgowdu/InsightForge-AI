"""
Test AnalysisRepository with PostgreSQL.
"""

from app.database.session import SessionLocal
from app.repositories.analysis_repository import AnalysisRepository


def main():
    db = SessionLocal()

    try:
        analysis = AnalysisRepository.create(
            db=db,
            repository="microsoft/vscode",
            status="completed",
            total_clusters=2,
            results={
                "clusters": [
                    {
                        "cluster": 0,
                        "documents": 5,
                        "summary": "Chat session corruption issues.",
                    },
                    {
                        "cluster": 1,
                        "documents": 3,
                        "summary": "UI configuration issues.",
                    },
                ]
            },
        )

        print("=" * 80)
        print("Analysis Repository Test")
        print("=" * 80)

        print("\nCreated analysis:")
        print(f"ID: {analysis.id}")
        print(f"Repository: {analysis.repository}")
        print(f"Status: {analysis.status}")
        print(f"Clusters: {analysis.total_clusters}")

        fetched = AnalysisRepository.get_by_id(
            db=db,
            analysis_id=analysis.id,
        )

        print("\nFetched analysis:")
        print(fetched.results)

        recent = AnalysisRepository.get_recent(
            db=db,
            limit=10,
        )

        print("\nRecent analyses:")

        for item in recent:
            print(
                f"{item.id} | "
                f"{item.repository} | "
                f"{item.status}"
            )

        print("\n✅ Analysis repository working.")

    finally:
        db.close()


if __name__ == "__main__":
    main()