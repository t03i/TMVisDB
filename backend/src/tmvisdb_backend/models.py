from typing import List, Optional
from datetime import date
from sqlmodel import (
    Field,
    Relationship,
    SQLModel,
    Index,
)


class PublicOrganism(SQLModel, table=False):
    name: str
    taxon_id: str = Field(index=True, unique=True)
    super_kingdom: str = Field(index=True)
    clade: Optional[str] = Field(index=True, nullable=True)


class Organism(PublicOrganism, table=True):
    __tablename__ = "organism"
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
    __tablename__ = "sequence"
    id: Optional[int] = Field(default=None, primary_key=True)
    organism_id: int = Field(foreign_key="organism.id", index=True)

    tminfo: "TMInfo" = Relationship(back_populates="sequence")
    orgamism: Organism = Relationship(back_populates="sequences")
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
    __tablename__ = "tminfo"
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


class Annotation(SQLModel, table=True):
    __tablename__ = "annotation"
    id: Optional[int] = Field(default=None, primary_key=True)
    sequence_id: int = Field(foreign_key="sequence.id", index=True)
    start: int
    end: int
    label: str = Field(max_length=100)
    date_added: date
    source_db: str
    source_db_ref: Optional[str] = None
    source_db_url: Optional[str] = Field(max_length=400, nullable=True)

    sequence: Sequence = Relationship(back_populates="annotations")

    __table_args__ = (
        Index("ix_annotation_sequence_id_start_end", "sequence_id", "start", "end"),
    )
