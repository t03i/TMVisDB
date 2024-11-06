FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS dev-deps
RUN --mount=type=bind,source=frontend/package.json,target=package.json \
    --mount=type=bind,source=frontend/pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,id=pnpm-dev,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM dev-deps AS dev
VOLUME /app
CMD [ "pnpm", "dev", "--port", "5173", "--host", "0.0.0.0" ]

FROM dev-deps AS build
COPY frontend/ /app/
RUN pnpm run build

FROM base AS prod-deps
RUN --mount=type=bind,source=frontend/package.json,target=package.json \
    --mount=type=bind,source=frontend/pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,id=pnpm-prod,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile

FROM base AS prod
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.svelte-kit /app/.svelte-kit
COPY frontend/package.json frontend/pnpm-lock.yaml /app/

EXPOSE 8000
CMD [ "pnpm", "preview", "--port", "8000" ]
