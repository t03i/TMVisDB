# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

import json
import subprocess
from pathlib import Path

from fastapi.openapi.utils import get_openapi
from backend.app.main import app  # Adjust this import based on your project structure


def export_and_modify_openapi():
    # Export OpenAPI
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        openapi_version=app.openapi_version,
        description=app.description,
        routes=app.routes,
    )

    # Modify operationId
    for path in openapi_schema["paths"].values():
        for operation in path.values():
            if "operationId" in operation and operation.get("tags"):
                tag = operation["tags"][0]
                operation["operationId"] = operation["operationId"].removeprefix(
                    f"{tag}-"
                )

    # Write to file
    output_path = Path("openapi.json")
    with output_path.open("w") as f:
        json.dump(openapi_schema, f, indent=2)

    return output_path


def generate_svelte_query_client(openapi_path):
    orval_config = {
        "backend": {
            "output": {
                "mode": "split",
                "target": "frontend/src/client",
                "schemas": "frontend/src/client/model",
                "client": "svelte-query",
            },
            "input": {
                "target": str(openapi_path),
            },
        }
    }

    # Write Orval config
    with open("orval.config.js", "w") as f:
        f.write(f"module.exports = {json.dumps(orval_config, indent=2)}")

    # Run Orval
    subprocess.run(["npx", "orval"], check=True)


def lint_with_biome():
    subprocess.run(
        ["npx", "biome", "check", "--apply", "frontend/src/client"], check=True
    )


def main():
    openapi_path = export_and_modify_openapi()
    generate_svelte_query_client(openapi_path)
    lint_with_biome()
    print("API client generated and linted successfully!")


if __name__ == "__main__":
    main()
