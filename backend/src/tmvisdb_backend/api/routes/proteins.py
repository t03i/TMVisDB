# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
from typing import Annotated

from fastapi import APIRouter, HTTPException, Path
from pydantic import PositiveInt

from ..deps import SessionDep
from tmvisdb_backend.models import ProteinInfo
import tmvisdb_backend.crud as crud
from tmvisdb_backend.core.config import settings

router = APIRouter()


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


@router.get("/{uniprot_id}/", response_model=list[ProteinInfo])
def get_protein_by_id(session: SessionDep, uniprot_id: str):
    pass


@router.get("/", response_model=list[ProteinInfo])
def get_filtered_proteins(session: SessionDep, uniprot_id: str):
    pass
