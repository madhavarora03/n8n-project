from fastapi import FastAPI

from api.router import auth

app = FastAPI()

app.include_router(auth.router)


@app.get("/api/health", tags=["health"])
def health_check():
    return {"message": "Healthy!"}
