# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from typing import Optional

from .definitions import DatabaseType, Taxonomy
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
    taxonomy_info = {}
    
    for member in Taxonomy:
        if '_' not in member.name:
            # This is a super kingdom (domain)
            taxonomy_info[member.value] = []
        else:
            super_kingdom, clade = get_separated_taxonomy(member)
            taxonomy_info[super_kingdom].append(clade)
            
    return taxonomy_info
    
    

def get_separated_taxonomy(taxonmy: Taxonomy) -> tuple[str, str | None]:
    
    if "_" not in taxonmy.name:
        return taxonmy.value, None
    
    super_kingdom_key= taxonmy.name.split("_")[0]
    super_kingdom = Taxonomy[super_kingdom_key.upper()].value  
    clade = taxonmy.value
    return super_kingdom, clade