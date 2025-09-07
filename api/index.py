from fastapi import FastAPI

from .router import auth

app = FastAPI()

app.include_router(auth.router)


@app.get("/api/health")
def health_check():
    return {"message": "Healthy!"}
