# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from typing import Annotated, Any, Literal

from pydantic import (
    AnyUrl,
    BeforeValidator,
    HttpUrl,
    computed_field,
    FilePath,
    DirectoryPath,
)
from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )
    API_V1_STR: str = "/api/v1"
    DOMAIN: str = "localhost"
    ENVIRONMENT: Literal["development", "staging", "production"] = "development"
    MAX_RESULTS_LIMIT: int = 100
    MIN_PROTEIN_LENGTH: int = 16
    MAX_PROTEIN_LENGTH: int = 5500

    @computed_field  # type: ignore[prop-decorator]
    @property
    def server_host(self) -> str:
        # Use HTTPS for anything other than local development
        if self.ENVIRONMENT == "local":
            return f"http://{self.DOMAIN}"
        return f"https://{self.DOMAIN}"

    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    PROJECT_NAME: str = "TMVis"
    SENTRY_DSN: HttpUrl | None = None

    SQLITE_DATABASE_PATH: FilePath = "data/tmvis.db"
    SHARED_DIR_PATH: DirectoryPath = "shared/"

    @computed_field  # type: ignore[prop-decorator]
    @property
    def SQL_ALCHEMY_DB_URL(self) -> AnyUrl:
        return f"sqlite:///{self.SQLITE_DATABASE_PATH}"


settings = Settings()  # type: ignore
