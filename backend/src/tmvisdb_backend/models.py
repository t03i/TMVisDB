from typing import List, Optional
from datetime import date
from sqlmodel import (
    Field,
    Relationship,
    SQLModel,
    Index,
)
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import case, select


class Organism(SQLModel, table=True):
    __tablename__ = "organism"
    id: Optional[int] = Field(default=None, primary_key=True)
    taxon_id: str = Field(index=True, unique=True)
    name: str
    super_kingdom: str = Field(index=True)
    clade: Optional[str] = Field(index=True, nullable=True)

    sequences: List["Sequence"] = Relationship(back_populates="organism")

    __table_args__ = (
        Index("ix_organism_super_kingdom_clade", "super_kingdom", "clade"),
    )


class Sequence(SQLModel, table=True):
    __tablename__ = "sequence"
    id: Optional[int] = Field(default=None, primary_key=True)
    uniprot_id: str
    uniprot_accession: str = Field(index=True, unique=True)
    organism_id: int = Field(foreign_key="organism.id", index=True)
    sequence: str
    seq_length: int = Field(index=True)

    tm_info: "TMInfo" = Relationship(back_populates="sequence")
    annotations: List["Annotation"] = Relationship(back_populates="sequence")


class TMInfo(SQLModel, table=True):
    __tablename__ = "tminfo"
    id: Optional[int] = Field(default=None, primary_key=True)
    sequence_id: int = Field(foreign_key="sequence.id", index=True)
    tm_helix_count: int
    tm_helix_percent: float
    tm_strand_count: int
    tm_strand_percent: float
    signal_count: int
    signal_percent: float
    generated_at: date
    has_alpha_helix: bool = Field(index=True)
    has_beta_strand: bool = Field(index=True)
    has_signal: bool = Field(index=True)

    sequence: Sequence = Relationship(back_populates="tm_info")

    __table_args__ = (
        Index(
            "ix_tminfo_has_alpha_helix_has_beta_strand_has_signal",
            "has_alpha_helix",
            "has_beta_strand",
            "has_signal",
        ),
    )


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


# class SequenceInfoView(SQLModel, table=True):
#     __tablename__ = "sequence_info_view"
#     uniprot_id: str = Field(primary_key=True)
#     uniprot_accession: str = Field(index=True)
#     seq_length: int
#     organism_name: str
#     organism_taxon_id: str
#     organism_super_kingdom: str
#     organism_clade: Optional[str]
#     tm_has_alpha_helix: bool
#     tm_has_beta_strand: bool
#     tm_has_signal: bool
#     tm_helix_count: int
#     tm_strand_count: int
#     signal_count: int

#     @hybrid_property
#     def tm_helix_percent(self) -> float:
#         return (
#             (self.tm_helix_count * 100.0) / self.seq_length
#             if self.seq_length != 0
#             else 0
#         )

#     @hybrid_property
#     def tm_strand_percent(self) -> float:
#         return (
#             self.tm_strand_count * 100.0 / self.seq_length
#             if self.seq_length != 0
#             else 0
#         )

#     @hybrid_property
#     def signal_percent(self) -> float:
#         return (
#             (self.signal_count * 100.0) / self.seq_length if self.seq_length != 0 else 0
#         )

#     @classmethod
#     def create_view(cls, engine):
#         view_query = (
#             select(
#                 Sequence.uniprot_id,
#                 Sequence.uniprot_accession,
#                 Sequence.seq_length,
#                 Organism.name.label("organism_name"),
#                 Organism.taxon_id.label("organism_taxon_id"),
#                 Organism.super_kingdom.label("organism_super_kingdom"),
#                 Organism.clade.label("organism_clade"),
#                 TMInfo.has_alpha_helix.label("tm_has_alpha_helix"),
#                 TMInfo.has_beta_strand.label("tm_has_beta_strand"),
#                 TMInfo.has_signal.label("tm_has_signal"),
#                 TMInfo.tm_helix_count,
#                 TMInfo.tm_strand_count,
#                 TMInfo.signal_count,
#             )
#             .join(Organism)
#             .join(TMInfo)
#         )

#         view_definition = select(view_query.subquery())
#         create_view_statement = (
#             f"CREATE OR REPLACE VIEW {cls.__tablename__} AS {view_definition}"
#         )
#         engine.execute(create_view_statement)
