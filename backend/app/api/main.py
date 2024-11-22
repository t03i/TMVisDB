from fastapi import APIRouter

from .routes import annotations, proteins, info
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(proteins.router)
api_router.include_router(
    annotations.router, prefix="/annotations", tags=["annotations"]
)
api_router.include_router(info.router, prefix="/info", tags=["information"])


@api_router.get("/", tags=["root"], include_in_schema=False)
async def root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME}! Find the API docs at /docs."
    }
