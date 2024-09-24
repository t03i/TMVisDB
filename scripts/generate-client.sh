#!/bin/bash

# Set the root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"
BUILD_DIR="$ROOT_DIR/build"


# Ensure necessary directories exist
mkdir -p "$BUILD_DIR"

# Function to run Python script
run_python_script() {
    cd "$BACKEND_DIR" && uv run python - << EOF
import json
from pathlib import Path
from fastapi.openapi.utils import get_openapi
from app.main import app

def export_and_modify_openapi(output_path):
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        openapi_version=app.openapi_version,
        description=app.description,
        routes=app.routes,
    )

    for path in openapi_schema["paths"].values():
        for operation in path.values():
            if "operationId" in operation and operation.get("tags"):
                tag = operation["tags"][0]
                operation["operationId"] = operation["operationId"].removeprefix(f"{tag}-")

    output_path = Path(output_path)
    with output_path.open("w") as f:
        json.dump(openapi_schema, f, indent=2)

    return output_path

export_and_modify_openapi("$BUILD_DIR/openapi.json")
EOF
}

# Generate OpenAPI schema
echo "Generating OpenAPI schema..."
run_python_script

# Generate Orval config
echo "Generating Orval config..."
cat > "$BUILD_DIR/orval.config.js" << EOF
module.exports = {
  backend: {
    output: {
      mode: "split",
      target: "$FRONTEND_DIR/src/lib/client/tmvis.ts",
      schemas: "$FRONTEND_DIR/src/lib/client/model",
      client: "svelte-query",
    },
    input: {
      target: "$BUILD_DIR/openapi.json",
    },
  },
};
EOF

# Run Orval
echo "Running Orval..."
cd "$BUILD_DIR" && pnpx orval

# Lint with Biome
echo "Linting with Biome..."
pnpx biome check --apply "$FRONTEND_DIR/src/client"

echo "API client generated and linted successfully!"
