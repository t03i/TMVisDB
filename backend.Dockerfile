# Install uv
# TODO transition to https://hynek.me/articles/docker-uv/
FROM python:3.12-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Add basic dependencies
ARG TINI_VERSION="v0.19.0"
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN apt-get update && apt-get install -y --no-install-recommends \
    gosu; \
    rm -rf /var/lib/apt/lists/*; \
    chmod +x /tini;

# Configure UV
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
ENV UV_SYSTEM_PYTHON=1

# Change the working directory to the `app` directory
WORKDIR /app

# Install dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=backend/uv.lock,target=uv.lock \
    --mount=type=bind,source=backend/pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-editable

ENV PATH="/app/.venv/bin:$PATH"

# Copy the project into the image
ADD backend/ /app/
ADD shared/ /app/shared
RUN mkdir -p /app/data

# Sync the project
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=backend/uv.lock,target=uv.lock \
    bash -c "if [ $INSTALL_DEV == 'true' ] ; then uv sync --frozen ; else uv sync --frozen --no-dev --no-editable; fi"

# Add entrypoint script
COPY scripts/backend-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/tini", "--", "/entrypoint.sh"]
