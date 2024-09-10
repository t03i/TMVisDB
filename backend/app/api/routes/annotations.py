from fastapi import APIRouter, HTTPException

from backend.src.tmvisdb_backend.models import Annotation
import backend.src.tmvisdb_backend.crud as crud

router = APIRouter()


@router.get("/{uniprot_id}/", response_model=list[Annotation])
def get_protein_annotations(uniprot_id: str):
    annotations = crud.get_membrane_annotation_for_id(uniprot_id)
    if annotations is None:
        raise HTTPException(status_code=404, detail="Annotations not found")
    return annotations
