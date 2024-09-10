# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
from typing import Annotated, Optional

from fastapi import APIRouter, HTTPException, Path, Depends
from pydantic import PositiveInt, BaseModel, Field

from ..deps import SessionDep
from tmvisdb_backend.models import ProteinInfo
import tmvisdb_backend.crud as crud
from tmvisdb_backend.core.config import settings
from tmvisdb_backend.lineage_definitions import Topology, Kingdom, Domain

router = APIRouter()


class ProteinQueryParams(BaseModel):
    topology: Optional[Topology] = None
    has_signal_peptide: Optional[bool] = None
    sequence_length_min: PositiveInt = Field(default=0, ge=0)
    sequence_length_max: PositiveInt = Field(default=5500, le=5500)
    limit: PositiveInt = Field(
        default=settings.MAX_RESULTS_LIMIT, le=settings.MAX_RESULTS_LIMIT
    )


@router.get("/random/", response_model=list[ProteinInfo])
def get_random_proteins(
    session: SessionDep,
    num_sequences: Annotated[
        int,
        Path(
            title="Number of random proteins to select",
            gt=0,
            le=settings.MAX_RESULTS_LIMIT,
        ),
    ],
):
    proteins = crud.get_random_proteins(session, num_sequences)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return proteins


@router.get("/{uniprot_accession}/", response_model=ProteinInfo)
def get_protein_by_id(session: SessionDep, uniprot_accession: str):
    pass


@router.get("/by-organism/", response_model=list[ProteinInfo])
def get_proteins_by_organism(
    session: SessionDep,
    organism_id: PositiveInt,
    Depends(ProteinQueryParams),
):
    pass


@router.get("/by-lineage/", response_model=list[ProteinInfo])
def get_proteins_by_lineage(
    session: SessionDep,
    domain: Domain,
    Kingdom: Kingdom,
    Depends(ProteinQueryParams),
):
    pass
