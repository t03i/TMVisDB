"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine import reflection
import sqlmodel
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision: str = ${repr(up_revision)}
down_revision: Union[str, None] = ${repr(down_revision)}
branch_labels: Union[str, Sequence[str], None] = ${repr(branch_labels)}
depends_on: Union[str, Sequence[str], None] = ${repr(depends_on)}

def run_analyze():
    conn = op.get_bind()
    inspector = reflection.Inspector.from_engine(conn)
    if 'sqlite' in inspector.engine.dialect.name:
        conn.execute(sa.text("ANALYZE"))


def upgrade() -> None:
    ${upgrades if upgrades else "pass"}

    run_analyze()


def downgrade() -> None:
    ${downgrades if downgrades else "pass"}

    run_analyze()
