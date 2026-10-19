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
            status="pending",
            total_clusters=0,
            results={
                "clusters": []
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

        # Test status: pending -> running
        updated = AnalysisRepository.update_status(
            db=db,
            analysis_id=analysis.id,
            status="running",
        )

        print("\nUpdated status:")
        print(updated.status)

        # Test status: running -> completed
        updated = AnalysisRepository.update_status(
            db=db,
            analysis_id=analysis.id,
            status="completed",
        )

        print("\nFinal status:")
        print(updated.status)

        # Test fetching by ID
        fetched = AnalysisRepository.get_by_id(
            db=db,
            analysis_id=analysis.id,
        )

        print("\nFetched analysis:")
        print(fetched.results)

        # Test recent analyses
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