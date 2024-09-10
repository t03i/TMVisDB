# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from sqlmodel import SQLModel, create_engine
from sqlalchemy import event

from .config import settings

# Create the SQLAlchemy engine
engine = create_engine(
    settings.SQL_ALCHEMY_DB_URL, connect_args={"check_same_thread": False}
)


def set_pragma_settings(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA cache_size = -65536")  # Set cache size to 64MB
    cursor.execute("PRAGMA journal_mode = OFF")
    cursor.execute("PRAGMA synchronous = NORMAL")
    cursor.execute("PRAGMA temp_store = MEMORY")
    cursor.execute("PRAGMA mmap_size = 268435456")
    cursor.execute("PRAGMA read_uncommitted = 1")
    cursor.execute("PRAGMA optimize")
    cursor.close()


def initialize_database_connection():
    # Register the event listener to set PRAGMA settings
    event.listen(engine, "connect", set_pragma_settings)

    # Create all tables in the database
    SQLModel.metadata.create_all(bind=engine)

    return engine
