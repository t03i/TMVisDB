from fastapi import APIRouter, HTTPException

from ..deps import SessionDep
from app.models import PublicAnnotation
from app import utils
from app.utils import AnnotationLegend, DatabaseType
import app.crud as crud


router = APIRouter()


@router.get("/{uniprot_id}", response_model=list[PublicAnnotation])
def get_protein_annotations(session: SessionDep, uniprot_id: str):
    annotations = crud.get_membrane_annotation_for_id(session, uniprot_id)
    if annotations is None:
        raise HTTPException(status_code=404, detail="Annotations not found")
    return [
        PublicAnnotation.model_validate(annotation.model_dump())
        for annotation in annotations
    ]


@router.get("/legend/{db_name}", response_model=AnnotationLegend)
def get_db_legend(db_name: DatabaseType):
    legend = utils.get_database_legend(db_name)
    if legend is None:
        raise HTTPException(status_code=404, detail="No legend found")
    return legend
