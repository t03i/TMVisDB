# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
import os

from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import declarative_base

from tmvisdb_backend.models import Organism, Sequence, TMInfo, Annotation

# Import your SQLAlchemy models here
# from your_models import Model1, Model2, ...

Base = declarative_base()

# Replace this with your actual database URL
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///data/tmvis.db")

engine = create_engine(DATABASE_URL)
inspector = inspect(engine)


def get_column_type(column):
    """Convert SQLAlchemy column type to string representation."""
    return str(column.type)


def compare_table_with_model(table_name, model):
    """Compare a database table with a SQLAlchemy model."""
    print(f"Comparing table '{table_name}' with model '{model.__name__}':")

    # Get database table info
    db_columns = {col["name"]: col for col in inspector.get_columns(table_name)}

    # Get model info
    model_columns = {c.name: c for c in model.__table__.columns}

    # Compare columns
    all_columns = set(db_columns.keys()) | set(model_columns.keys())
    for col_name in all_columns:
        if col_name in db_columns and col_name in model_columns:
            db_type = db_columns[col_name]["type"]
            model_type = get_column_type(model_columns[col_name])
            if str(db_type) != model_type:
                print(f"  Column '{col_name}' type mismatch:")
                print(f"    DB: {db_type}")
                print(f"    Model: {model_type}")
        elif col_name in db_columns:
            print(f"  Column '{col_name}' exists in DB but not in model")
        else:
            print(f"  Column '{col_name}' exists in model but not in DB")

    # Compare indexes
    db_indexes = inspector.get_indexes(table_name)
    model_indexes = model.__table__.indexes

    db_index_names = {idx["name"] for idx in db_indexes}
    model_index_names = {idx.name for idx in model_indexes}

    for idx_name in db_index_names - model_index_names:
        print(f"  Index '{idx_name}' exists in DB but not in model")

    for idx_name in model_index_names - db_index_names:
        print(f"  Index '{idx_name}' exists in model but not in DB")

    print()  # Empty line for readability


compare_table_with_model("tminfo", TMInfo)
compare_table_with_model("organism", Organism)
compare_table_with_model("sequence", Sequence)
compare_table_with_model("annotation", Annotation)
