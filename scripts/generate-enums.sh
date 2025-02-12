#!/bin/bash

# Set the root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHARED_DIR="$ROOT_DIR/shared"
BACKEND_DIR="$ROOT_DIR/backend"
BUILD_DIR="$ROOT_DIR/build"

# Ensure necessary directories exist
mkdir -p "$BUILD_DIR"

# Run the Python script to generate enums
echo "Generating Python enums from taxonomies.json..."
cd "$BACKEND_DIR" && uv run python - << EOF
import json
from enum import Enum
from pathlib import Path

# Paths
shared_dir = Path("$SHARED_DIR")
output_path = Path("$BACKEND_DIR/app/taxonomy_enums.py")
taxonomy_json_path = shared_dir / "taxonomies.json"

# Load taxonomy data
def load_taxonomy_data():
    with taxonomy_json_path.open("r") as f:
        return json.load(f)

taxonomy_data = load_taxonomy_data()

# Extract super kingdoms and clades
SUPER_KINGDOM_VALUES = [item["value"] for item in taxonomy_data]
CLADES_VALUES = [clade for item in taxonomy_data for clade in item["clades"]]

# Helper function to sanitize enum member names
def sanitize_enum_member_name(value):
    return (
        value.replace(' ', '_')
        .replace('-', '_')
        .replace('/', '_')
        .replace('(', '')
        .replace(')', '')
        .replace("'", '')
        .replace(',', '')
        .replace('.', '')
        .replace(':', '')
    )

# Create enums dynamically
def create_enum(name, values):
    return Enum(
        name,
        {sanitize_enum_member_name(value): value for value in values}
    )

SuperKingdom = create_enum('SuperKingdom', SUPER_KINGDOM_VALUES)
Clade = create_enum('Clade', CLADES_VALUES)

# Generate SK_CLADE_MAPPING using enums
SK_CLADE_MAPPING = {}
for item in taxonomy_data:
    sk_value = item["value"]
    sk_enum_member = next((member for member in SuperKingdom if member.value == sk_value), None)
    if sk_enum_member is not None:
        clades = item.get("clades", [])
        clade_enum_members = [
            next((member for member in Clade if member.value == clade), None)
            for clade in clades
        ]
        clade_enum_members = [member for member in clade_enum_members if member is not None]
        SK_CLADE_MAPPING[sk_enum_member] = clade_enum_members

# Save enums and mapping to a Python file
with output_path.open('w') as f:
    f.write('# This file is autogenerated by scripts/generate-enums.sh\n')
    f.write('# cspell:disable\n')
    f.write('from enum import Enum\n\n')

    # Write SuperKingdom
    f.write('class SuperKingdom(str, Enum):\n')
    for member in SuperKingdom:
        f.write(f"    {member.name} = '{member.value}'\n")
    f.write('\n')

    # Write Clade
    f.write('class Clade(str, Enum):\n')
    for member in Clade:
        f.write(f"    {member.name} = '{member.value}'\n")
    f.write('\n')

    # Write SK_CLADE_MAPPING
    f.write('SK_CLADE_MAPPING = {\n')
    for sk_member, clade_members in SK_CLADE_MAPPING.items():
        f.write(f"    SuperKingdom.{sk_member.name}: [\n")
        for clade_member in clade_members:
            f.write(f"        Clade.{clade_member.name},\n")
        f.write("    ],\n")
    f.write('}\n')

print(f"Generated enums and mapping saved to {output_path}")
EOF
