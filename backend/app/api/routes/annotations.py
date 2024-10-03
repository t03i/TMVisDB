from fastapi import APIRouter, HTTPException

from ..deps import SessionDep
from app.models import PublicAnnotation, AnnotationData
import app.crud as crud


router = APIRouter()


@router.get("/{uniprot_id}", response_model=list[PublicAnnotation])
def get_protein_annotations(session: SessionDep, uniprot_id: str):  # type: ignore
    annotations = crud.get_membrane_annotation_for_id(session, uniprot_id)
    if annotations is None:
        raise HTTPException(status_code=404, detail="Annotations not found")
    return AnnotationData(
        annotations=[
            PublicAnnotation.model_validate(annotation.model_dump())
            for annotation in annotations
        ]
    )
