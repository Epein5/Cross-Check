from fastapi import FastAPI


app = FastAPI(title="Cross-Check API")


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Hello from cross-check!"}
