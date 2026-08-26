"""
Test background analysis task.
"""

from app.tasks.analysis_task import run_analysis
from app.services.analysis_service import AnalysisService


def fake_analyze_repository(
    db,
    analysis_id,
    owner,
    repository,
    limit,
):
    print("\nAnalysisService called with:")
    print(f"Analysis ID: {analysis_id}")
    print(f"Owner: {owner}")
    print(f"Repository: {repository}")
    print(f"Limit: {limit}")

    assert analysis_id == 1
    assert owner == "microsoft"
    assert repository == "vscode"
    assert limit == 20

    return []


def main():
    print("=" * 80)
    print("Background Analysis Task Test")
    print("=" * 80)

    original_method = AnalysisService.analyze_repository

    AnalysisService.analyze_repository = fake_analyze_repository

    try:
        run_analysis(
            analysis_id=1,
            owner="microsoft",
            repository="vscode",
            limit=20,
        )

        print("\n✅ Background analysis task working.")

    finally:
        AnalysisService.analyze_repository = original_method


if __name__ == "__main__":
    main()