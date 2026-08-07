"""
Standalone test for Opportunity Engine.
"""

from app.ai.opportunity_engine import OpportunityEngine


def main():
    summary = """
Title:
Application Startup Crashes

Summary:
Users consistently report crashes and freezes during startup.

Possible Causes:
Extension conflicts.
Startup initialization.
"""

    result = OpportunityEngine.analyze(summary)

    print("=" * 80)
    print("Opportunity Analysis")
    print("=" * 80)

    for key, value in result.items():
        print(f"{key}:")
        print(value)
        print()


if __name__ == "__main__":
    main()