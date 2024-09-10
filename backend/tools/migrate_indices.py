# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from sqlalchemy import create_engine, text
from sqlmodel import SQLModel


# Replace with your actual database URL
DATABASE_URL = "sqlite:///data/tmvis.db"


def run_migration():
    # Create a SQLAlchemy engine
    engine = create_engine(DATABASE_URL)

    # Create a connection
    with engine.connect() as conn:
        # Start a transaction
        with conn.begin():
            table_exists = conn.execute(
                text(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='tm_info'"
                )
            ).fetchone()

            if table_exists:
                # Rename 'tm_info' table to 'tminfo' using SQLite syntax
                conn.execute(text("ALTER TABLE tm_info RENAME TO tminfo"))
                print("Table 'tm_info' renamed to 'tminfo'")
            else:
                print("Table 'tm_info' does not exist, skipping rename operation")

            # For SQLite, we need to drop and recreate indexes with new names
            # First, get the CREATE statements for existing indexes
            index_queries = conn.execute(
                text("SELECT name, sql FROM sqlite_master WHERE type='index'")
            ).fetchall()

            # Recreate indexes with new names
            index_name_mapping = {
                "organism_super_kingdom_clade": "ix_organism_super_kingdom_clade",
                "tminfo_has_alpha_helix_has_beta_strand_has_signal": "ix_tm_info_has_alpha_helix_has_beta_strand_has_signal",
                "organism_clade": "ix_organism_clade",
                "organism_super_kingdom": "ix_organism_super_kingdom",
                "organism_taxon_id": "ix_organism_taxon_id",
                "sequence_organism_id": "ix_sequence_organism_id",
                "sequence_seq_length": "ix_sequence_seq_length",
                "sequence_uniprot_accession": "ix_sequence_uniprot_accession",
                "tminfo_sequence_id": "ix_tminfo_sequence_id",
                "tminfo_has_signal": "ix_tminfo_has_signal",
                "tminfo_has_alpha_helix": "ix_tminfo_has_alpha_helix",
                "tminfo_has_beta_strand": "ix_tminfo_has_beta_strand",
                "annotation_sequence_id": "ix_annotation_sequence_id",
            }

            for old_name, create_stmt in index_queries:
                if old_name in index_name_mapping:
                    conn.execute(text(f"DROP INDEX IF EXISTS {old_name}"))
                    new_name = index_name_mapping[old_name]
                    new_stmt = create_stmt.replace(old_name, new_name)
                    conn.execute(text(new_stmt))

            # Execute the index recreation
            conn.execute(text("DROP INDEX IF EXISTS annotation_sequence_start_end"))
            index_exists = conn.execute(
                text("""
            SELECT name FROM sqlite_master 
            WHERE type='index' AND name='ix_annotation_sequence_id_start_end'
        """)
            ).fetchone()

            if not index_exists:
                # Create the index only if it doesn't exist
                conn.execute(
                    text("""
                    CREATE INDEX ix_annotation_sequence_id_start_end
                    ON annotation (sequence_id, start, "end")
                """)
                )
                print("Index created successfully.")
            else:
                print("Index already exists. No action taken.")

    print("Migration completed successfully.")


if __name__ == "__main__":
    run_migration()
