import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict


# Load environment variables from .env file
load_dotenv()

class Config(BaseSettings):
    """Application configuration."""

    supabase_url: str = os.environ.get("SUPABASE_URL", "")
    supabase_anon_key: str = os.environ.get("SUPABASE_ANON_KEY", "")
    allowed_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://cross-check-fronten-git-da275a-aayush-gautams-projects-a353a4a0.vercel.app",
        "https://cross-check-frontend-jhjtsrdtq-aayush-gautams-projects-a353a4a0.vercel.app",
    ]


settings = Config()
