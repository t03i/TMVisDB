# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

import json
import subprocess
from pathlib import Path
from fastapi.openapi.utils import get_openapi
from app.main import app


def export_and_modify_openapi(output_path="../build/openapi.json"):
    """
    Exports the OpenAPI schema from the FastAPI application and modifies the operationId.

    :param output_path: Path to save the modified OpenAPI schema.
    :return: Path to the saved OpenAPI schema.
    """
    # Export OpenAPI schema
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

    # Write the modified OpenAPI schema to a file
    output_path = Path(output_path)
    with output_path.open("w") as f:
        json.dump(openapi_schema, f, indent=2)

    return output_path


def generate_svelte_query_client(openapi_path):
    """
    Generates a Svelte Query client using Orval and the provided OpenAPI schema.

    :param openapi_path: Path to the OpenAPI schema file.
    """
    orval_config = {
        "backend": {
            "output": {
                "mode": "split",
                "target": "../frontend/src/client",
                "schemas": "../frontend/src/client/model",
                "client": "svelte-query",
            },
            "input": {
                "target": str(openapi_path),
            },
        }
    }

    # Write Orval config to file
    orval_config_path = Path("../build/orval.config.js")
    with orval_config_path.open("w") as f:
        f.write(f"module.exports = {json.dumps(orval_config, indent=2)}")

    # Run Orval using pnpm
    try:
        subprocess.run(["pnpx", "orval"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running Orval: {e}")
        raise


def lint_with_biome():
    """
    Lints the generated Svelte Query client code using Biome.
    """
    try:
        subprocess.run(
            ["pnpx", "biome", "check", "--apply", "frontend/src/client"],
            check=True,
        )
    except subprocess.CalledProcessError as e:
        print(f"Error running Biome: {e}")
        raise


def main():
    """
    Main function that exports the OpenAPI schema, generates the client, and lints it.
    """
    try:
        # Export and modify the OpenAPI schema
        openapi_path = export_and_modify_openapi()

        # Generate the Svelte Query client using Orval
        generate_svelte_query_client(openapi_path)

        # Lint the generated client using Biome
        lint_with_biome()

        print("API client generated and linted successfully!")

    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
