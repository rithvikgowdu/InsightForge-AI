from fastapi import FastAPI

from app.api.v1.health import router as health_router

app = FastAPI(
    title="InsightForge AI",
    description="AI-powered Product Discovery Platform",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Welcome to InsightForge AI 🚀"
    }


app.include_router(health_router)