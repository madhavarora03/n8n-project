from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Clerk keys
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: str
    CLERK_SECRET_KEY: str

    # Postgres URL
    POSTGRES_URL: str

    class Config:
        env_file = ".env.local"


settings = Settings()  # type: ignore
