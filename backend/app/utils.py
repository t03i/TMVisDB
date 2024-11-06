# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

import json
from pathlib import Path
from typing import Dict, Any

from .definitions import DatabaseType
from .taxonomy_enums import SK_CLADE_MAPPING, SuperKingdom, Clade
from .models import AnnotationLegend, LabelInfo
from app.core.config import settings


def load_legend_data() -> Dict[str, Any]:
    legend_path: Path = settings.SHARED_DIR_PATH / "legend.json"
    with open(legend_path, "r") as f:
        return json.load(f)


LEGEND_DATA = load_legend_data()


def get_database_legend(database: DatabaseType) -> AnnotationLegend:
    db_name = database.value
    if db_name not in LEGEND_DATA:
        # Return empty legend instead of None to match return type
        return AnnotationLegend(name="", description="", labels=[])

    db_legend = LEGEND_DATA[db_name]
    return AnnotationLegend(
        name=db_legend.get("fullName", db_legend.get("name", "")),
        description=db_legend["description"],
        labels=[
            LabelInfo(label=label, description=info["description"])
            for label, info in db_legend["labels"].items()
        ],
    )


def get_all_taxonomies() -> dict[SuperKingdom, list[Clade]]:
    return SK_CLADE_MAPPING


def get_label_colors(database: DatabaseType, label: str) -> Dict[str, str]:
    db_name = database.value
    if db_name not in LEGEND_DATA or label not in LEGEND_DATA[db_name]["labels"]:
        return {}

    label_info = LEGEND_DATA[db_name]["labels"][label]
    return {
        "color_dark": label_info["color_dark"],
        "color_light": label_info["color_light"],
    }


def get_all_database_legends() -> Dict[str, AnnotationLegend]:
    return {
        db_name: get_database_legend(DatabaseType(db_name))
        for db_name in LEGEND_DATA.keys()
    }
