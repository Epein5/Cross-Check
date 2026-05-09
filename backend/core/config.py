import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


load_dotenv(Path(__file__).resolve().parents[2] / ".env")


@dataclass(frozen=True)
class Config:
    """Application configuration."""

    supabase_url: str


settings = Config(supabase_url=os.environ["SUPABASE_URL"])
