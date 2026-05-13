import re

from supabase import Client


def generate_unique_slug(name: str, supabase: Client) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    if not base:
        base = "org"

    slug = base
    counter = 1
    while True:
        result = (
            supabase.table("organizations")
            .select("id")
            .eq("slug", slug)
            .execute()
        )
        if not result.data:
            return slug
        slug = f"{base}-{counter}"
        counter += 1
