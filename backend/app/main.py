from fastapi import FastAPI

from app.api.v1.analysis import router as analysis_router
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.health import router as health_router
from app.core.config import settings

from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered Product Discovery Platform",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get(
    "/",
    summary="Application Root",
    description="Returns the application status.",
    tags=["Root"],
)
def root() -> dict:
    return {
        "message": f"Welcome to {settings.APP_NAME} 🚀"
    }


app.include_router(health_router)
app.include_router(users_router)
app.include_router(analysis_router)
app.include_router(auth_router)