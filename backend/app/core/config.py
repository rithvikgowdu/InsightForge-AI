"""
Application configuration.

Loads configuration from the backend/.env file.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "InsightForge AI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    # Database
    DATABASE_URL: str
    # GitHub
    GITHUB_TOKEN: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()