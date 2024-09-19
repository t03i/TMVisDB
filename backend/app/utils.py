# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from typing import Optional

from .definitions import DatabaseType, SK_CLADE_MAPPING
from .models import AnnotationLegend, LabelInfo


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


def get_all_taxonomies() -> dict[str, Optional[list[str]]]:
    return SK_CLADE_MAPPING
