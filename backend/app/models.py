from typing import List, Optional, Annotated
from datetime import date

from sqlmodel import (
    Field,
    Relationship,
    SQLModel,
    Index,
)
from pydantic import BaseModel, PositiveInt, Field as PD_Field, field_validator

from .definitions import Topology
from .taxonomy_enums import SuperKingdom, Clade, SK_CLADE_MAPPING
from .core.config import settings


class PublicOrganism(SQLModel, table=False):
    name: str = Field(alias="organism_name")
    taxon_id: str = Field(index=True, unique=True)
    super_kingdom: str = Field(index=True)
    clade: Optional[str] = Field(index=True, nullable=True)


class Organism(PublicOrganism, table=True):
    __tablename__: str = "organism"
    id: Optional[int] = Field(default=None, primary_key=True)
    sequences: List["Sequence"] = Relationship(back_populates="organism")

    __table_args__ = (
        Index("ix_organism_super_kingdom_clade", "super_kingdom", "clade"),
    )


class PublicSequence(SQLModel, table=False):
    uniprot_id: str
    uniprot_accession: str = Field(index=True, unique=True)
    sequence: str
    seq_length: int = Field(index=True)


class Sequence(PublicSequence, table=True):
    __tablename__: str = "sequence"
    id: Optional[int] = Field(default=None, primary_key=True)
    organism_id: int = Field(foreign_key="organism.id", index=True)

    tminfo: "TMInfo" = Relationship(back_populates="sequence")
    organism: Organism = Relationship(back_populates="sequences")
    annotations: List["Annotation"] = Relationship(back_populates="sequence")


class PublicTMInfo(SQLModel, table=False):
    has_alpha_helix: bool = Field(index=True)
    has_beta_strand: bool = Field(index=True)
    has_signal: bool = Field(index=True)
    tm_helix_count: int
    tm_helix_percent: float
    tm_strand_count: int
    tm_strand_percent: float
    signal_count: int
    signal_percent: float


class TMInfo(PublicTMInfo, table=True):
    __tablename__: str = "tminfo"
    id: Optional[int] = Field(default=None, primary_key=True)
    sequence_id: int = Field(foreign_key="sequence.id", index=True)
    generated_at: date

    sequence: Sequence = Relationship(back_populates="tminfo")

    __table_args__ = (
        Index(
            "ix_tminfo_has_alpha_helix_has_beta_strand_has_signal",
            "has_alpha_helix",
            "has_beta_strand",
            "has_signal",
        ),
    )


class ProteinInfo(PublicTMInfo, PublicSequence, PublicOrganism, table=False):
    pass


class PageInfo(BaseModel):
    next_cursor: Optional[str] = None
    has_next_page: bool


class ProteinResponse(BaseModel):
    items: list[ProteinInfo]
    page_info: PageInfo | None


class ProteinCount(BaseModel):
    count: int


class PublicAnnotation(SQLModel, table=False):
    start: int
    end: int
    label: str = Field(max_length=100)
    date_added: date
    source_db: str
    source_db_ref: Optional[str] = None
    source_db_url: Optional[str] = Field(max_length=400, nullable=True)


class Annotation(PublicAnnotation, table=True):
    __tablename__: str = "annotation"
    id: Optional[int] = Field(default=None, primary_key=True)
    sequence_id: int = Field(foreign_key="sequence.id", index=True)

    sequence: Sequence = Relationship(back_populates="annotations")

    __table_args__ = (
        Index("ix_annotation_sequence_id_start_end", "sequence_id", "start", "end"),
    )


class AnnotationData(BaseModel):
    annotations: List[PublicAnnotation]


class TaxonomyFilter(BaseModel):
    super_kingdom: SuperKingdom
    clade: Optional[Clade] = None

    @field_validator("clade")
    def validate_clade(cls, value, validation_info):
        if value is not None:
            super_kingdom = validation_info.data.get("super_kingdom")
            if super_kingdom is None:
                raise ValueError(
                    "super_kingdom must be provided when clade is specified"
                )
            if value not in SK_CLADE_MAPPING.get(super_kingdom, []):
                raise ValueError(
                    f"Invalid clade '{value.value}' for super kingdom '{super_kingdom.value}'"
                )
        return value


class ProteinFilter(BaseModel):
    topology: Optional[Topology] = None
    has_signal_peptide: Optional[bool] = None
    sequence_length_min: Annotated[
        Optional[PositiveInt], PD_Field(default=None, ge=settings.MIN_PROTEIN_LENGTH)
    ]
    sequence_length_max: Annotated[
        Optional[PositiveInt], PD_Field(default=None, le=settings.MAX_PROTEIN_LENGTH)
    ]


class ProteinRequest(ProteinFilter):
    cursor: Optional[str] = None
    page_size: PositiveInt = PD_Field(default=100, le=settings.MAX_RESULTS_LIMIT)


class LabelInfo(BaseModel):
    label: str
    description: str


class AnnotationLegend(BaseModel):
    name: str
    description: str
    labels: list[LabelInfo]


class ProteinExistence(BaseModel):
    exists: bool
