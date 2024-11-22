# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from fastapi import APIRouter, HTTPException
from typing import Annotated
from fastapi import Path

from app.core.config import settings
from app.models import ProteinResponse
from app.api.deps import SessionDep
import app.crud as crud

router = APIRouter(prefix="/random", tags=["random proteins"])


@router.get("/{num_sequences}/", response_model=ProteinResponse)
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
    proteins: ProteinResponse | None = crud.get_random_proteins(session, num_sequences)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return proteins
