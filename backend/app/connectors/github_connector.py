"""
GitHub connector for fetching public repository issues.
"""

from github import Github

from app.core.config import settings


class GitHubConnector:
    """
    Handles communication with the GitHub API.
    """

    def __init__(self):
        self.client = Github(settings.GITHUB_TOKEN)

    def fetch_issues(
        self,
        owner: str,
        repository: str,
        limit: int = 10,
    ) -> list[dict]:
        """
        Fetch open issues from a GitHub repository.
        """

        repo = self.client.get_repo(f"{owner}/{repository}")

        issues = repo.get_issues(state="open")

        results = []

        for issue in issues[:limit]:

            # Ignore pull requests
            if issue.pull_request is not None:
                continue

            results.append(
                {
                    "id": issue.id,
                    "title": issue.title,
                    "body": issue.body,
                    "state": issue.state,
                    "labels": [label.name for label in issue.labels],
                    "comments": issue.comments,
                    "url": issue.html_url,
                    "created_at": issue.created_at,
                }
            )

        return results