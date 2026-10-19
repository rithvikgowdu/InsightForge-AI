
"""initial schema

Revision ID: 6af7c0eda292
Revises:
Create Date: 2026-08-25 14:36:36.629804
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "6af7c0eda292"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create tables matching the existing ORM models."""

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("username", sa.String(length=50), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("username"),
        sa.UniqueConstraint("email"),
    )

    op.create_index("ix_users_id", "users", ["id"], unique=False)

    op.create_table(
        "analysis_runs",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("repository", sa.String(length=255), nullable=False),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.Column("total_clusters", sa.Integer(), nullable=False),
        sa.Column("results", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
    )

    op.create_index(
        "ix_analysis_runs_id", "analysis_runs", ["id"], unique=False
    )
    op.create_index(
        "ix_analysis_runs_user_id", "analysis_runs", ["user_id"], unique=False
    )


def downgrade() -> None:
    """Remove tables created by this migration."""

    op.drop_index("ix_analysis_runs_user_id", table_name="analysis_runs")
    op.drop_index("ix_analysis_runs_id", table_name="analysis_runs")
    op.drop_table("analysis_runs")
    op.drop_index("ix_users_id", table_name="users")
    op.drop_table("users")
