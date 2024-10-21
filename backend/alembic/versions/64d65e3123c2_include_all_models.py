"""Include all models

Revision ID: 64d65e3123c2
Revises:
Create Date: 2024-10-21 12:12:23.518049

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = "64d65e3123c2"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("sequence", schema=None) as batch_op:
        batch_op.alter_column(
            "sequence",
            existing_type=sa.TEXT(),
            type_=sqlmodel.sql.sqltypes.AutoString(),
            existing_nullable=False,
        )

    with op.batch_alter_table("tminfo", schema=None) as batch_op:
        batch_op.alter_column(
            "has_alpha_helix",
            existing_type=sa.INTEGER(),
            type_=sa.Boolean(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "has_beta_strand",
            existing_type=sa.INTEGER(),
            type_=sa.Boolean(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "has_signal",
            existing_type=sa.INTEGER(),
            type_=sa.Boolean(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "tm_helix_percent",
            existing_type=sa.REAL(),
            type_=sa.Float(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "tm_strand_percent",
            existing_type=sa.REAL(),
            type_=sa.Float(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "signal_percent",
            existing_type=sa.REAL(),
            type_=sa.Float(),
            existing_nullable=False,
        )
        batch_op.drop_index("ix_tm_info_has_alpha_helix_has_beta_strand_has_signal")
        batch_op.create_index(
            "ix_tminfo_has_alpha_helix_has_beta_strand_has_signal",
            ["has_alpha_helix", "has_beta_strand", "has_signal"],
            unique=False,
        )

    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("tminfo", schema=None) as batch_op:
        batch_op.drop_index("ix_tminfo_has_alpha_helix_has_beta_strand_has_signal")
        batch_op.create_index(
            "ix_tm_info_has_alpha_helix_has_beta_strand_has_signal",
            ["has_alpha_helix", "has_beta_strand", "has_signal"],
            unique=False,
        )
        batch_op.alter_column(
            "signal_percent",
            existing_type=sa.Float(),
            type_=sa.REAL(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "tm_strand_percent",
            existing_type=sa.Float(),
            type_=sa.REAL(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "tm_helix_percent",
            existing_type=sa.Float(),
            type_=sa.REAL(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "has_signal",
            existing_type=sa.Boolean(),
            type_=sa.INTEGER(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "has_beta_strand",
            existing_type=sa.Boolean(),
            type_=sa.INTEGER(),
            existing_nullable=False,
        )
        batch_op.alter_column(
            "has_alpha_helix",
            existing_type=sa.Boolean(),
            type_=sa.INTEGER(),
            existing_nullable=False,
        )

    with op.batch_alter_table("sequence", schema=None) as batch_op:
        batch_op.alter_column(
            "sequence",
            existing_type=sqlmodel.sql.sqltypes.AutoString(),
            type_=sa.TEXT(),
            existing_nullable=False,
        )

    # ### end Alembic commands ###