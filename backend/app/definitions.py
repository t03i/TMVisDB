from enum import Enum
import json
from itertools import chain

from .core.config import settings


def load_taxonomy_data():
    json_path = settings.SHARED_DIR_PATH / "taxonomies.json"
    with open(json_path, "r") as f:
        return json.load(f)


__TAXONOMY_DATA = load_taxonomy_data()


class DatabaseType(str, Enum):
    tmvis = "tmvis"
    topdb = "topdb"
    membranome = "membranome"
    uniprot = "uniprot"
    tmalphafold = "tmalphafold"


class Topology(Enum):
    ALL = "All"
    BOTH = "Both"
    ALPHA_HELIX = "Alpha-helix"
    BETA_STRAND = "Beta-strand"


SUPER_KINGDOM: list[str] = [item["value"] for item in __TAXONOMY_DATA]
CLADES: list[str] = list(
    chain.from_iterable(item.get("clades", []) for item in __TAXONOMY_DATA)
)
SK_CLADE_MAPPING = {item["value"]: item["clades"] for item in __TAXONOMY_DATA}
