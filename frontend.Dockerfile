FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$NODE_PATH:$PNPM_HOME:$PATH"

RUN corepack enable
WORKDIR /app
RUN mkdir -p /pnpm/store /node_modules


FROM base AS store
RUN --mount=type=bind,source=frontend/package.json,target=package.json \
    --mount=type=bind,source=frontend/pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm fetch --frozen-lockfile --store-dir /pnpm/store

FROM base AS dev-deps
RUN --mount=type=bind,source=frontend/package.json,target=package.json \
    --mount=type=bind,source=frontend/pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir /pnpm/store

FROM dev-deps AS dev
VOLUME /app
VOLUME /app/node_modules
CMD [ "pnpm", "dev", "--port", "5173", "--host", "0.0.0.0" ]
LABEL org.opencontainers.image.source=https://github.com/t031/TMVisDB
LABEL org.opencontainers.image.licenses=Apache-2.0

FROM dev-deps AS build
COPY frontend/ /app/
RUN pnpm run build

FROM base AS prod-deps
RUN --mount=type=bind,source=frontend/package.json,target=package.json \
    --mount=type=bind,source=frontend/pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile --store-dir /pnpm/store

FROM base AS prod
ENV PNPM_HOME="/pnpm"
ENV NODE_PATH="/node_modules"
ENV PATH="$NODE_PATH:$PNPM_HOME:$PATH"
ENV NODE_ENV="production"

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.svelte-kit /app/.svelte-kit
COPY frontend/package.json frontend/pnpm-lock.yaml /app/

EXPOSE 8000
CMD [ "pnpm", "preview", "--port", "8000" ]
LABEL org.opencontainers.image.source=https://github.com/t031/TMVisDB
LABEL org.opencontainers.image.licenses=Apache-2.0
