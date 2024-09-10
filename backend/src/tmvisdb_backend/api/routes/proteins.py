# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from fastapi import APIRouter, HTTPException
from pydantic import PositiveInt

from backend.src.tmvisdb_backend.models import Annotation
from ..deps import SessionDep
import backend.src.tmvisdb_backend.crud as crud

router = APIRouter()


@router.get("/random/", response_model=list[Annotation])
def get_random_proteins(session: SessionDep, num_sequences: PositiveInt = 100):
    try:
        annotations = crud.get_random_proteins(session, num_sequences)
        return annotations
    except ValueError:
        raise HTTPException(status_code=404, detail="Annotations not found")


@router.get("/{uniprot_id}/", response_model=list[Annotation])
def get_protein_by_id(session: SessionDep, uniprot_id: str):
    pass


@router.get("/", response_model=list[Annotation])
def get_filtered_proteins(session: SessionDep, uniprot_id: str):
    pass
