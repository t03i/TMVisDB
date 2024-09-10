# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
from typing import Optional

from enum import Enum
from pydantic import BaseModel, Field, PositiveInt

from .definitions import Topology
from .core.config import settings


class LabelInfo(BaseModel):
    label: str
    description: str


class AnnotationLegend(BaseModel):
    name: str
    description: str
    labels: list[LabelInfo]


class DatabaseType(str, Enum):
    tmvis = "tmvis"
    topdb = "topdb"
    membranome = "membranome"
    uniprot = "uniprot"
    tmalphafold = "tmalphafold"


class ProteinFilter(BaseModel):
    topology: Optional[Topology] = None
    has_signal_peptide: Optional[bool] = None
    sequence_length_min: PositiveInt = Field(default=0, ge=0)
    sequence_length_max: PositiveInt = Field(default=5500, le=5500)
    limit: PositiveInt = Field(
        default=settings.MAX_RESULTS_LIMIT, le=settings.MAX_RESULTS_LIMIT
    )


def get_database_legend(database: DatabaseType) -> AnnotationLegend:
    legends: dict[str, AnnotationLegend] = {
        DatabaseType.tmvis: AnnotationLegend(
            name="TMvis Prediction",
            description="Transmembrane topology predictions by TMbed",
            labels=[
                LabelInfo(label="H", description="Alpha-helix (IN-->OUT)"),
                LabelInfo(label="h", description="Alpha-helix (OUT-->IN)"),
                LabelInfo(label="B", description="Beta-strand (IN-->OUT)"),
                LabelInfo(label="b", description="Beta-strand (OUT-->IN)"),
                LabelInfo(label="i", description="Inside"),
                LabelInfo(label="o", description="Outside"),
                LabelInfo(label="S", description="Signal peptide"),
            ],
        ),
        DatabaseType.topdb: AnnotationLegend(
            name="TopDB Annotation",
            description="Experimentally determined topology from TopDB",
            labels=[
                LabelInfo(label="H", description="Alpha-helix"),
                LabelInfo(label="B", description="Beta-strand"),
                LabelInfo(label="I", description="Inside"),
                LabelInfo(label="O", description="Outside"),
            ],
        ),
        DatabaseType.membranome: AnnotationLegend(
            name="Membranome Annotation",
            description="Annotations from the Membranome database",
            labels=[
                LabelInfo(label="TM", description="Transmembrane region"),
                LabelInfo(label="I", description="Inside"),
                LabelInfo(label="O", description="Outside"),
            ],
        ),
        DatabaseType.uniprot: AnnotationLegend(
            name="UniProt Annotation",
            description="Annotations from UniProtKB",
            labels=[
                LabelInfo(label="TM", description="Transmembrane region"),
                LabelInfo(label="I", description="Intracellular"),
                LabelInfo(label="E", description="Extracellular"),
            ],
        ),
        DatabaseType.tmalphafold: AnnotationLegend(
            name="TmAlphaFold Annotation",
            description="Annotations from TmAlphaFold database",
            labels=[
                LabelInfo(label="TM", description="Transmembrane region"),
                LabelInfo(label="I", description="Inside"),
                LabelInfo(label="O", description="Outside"),
            ],
        ),
    }

    return legends.get(database, None)
