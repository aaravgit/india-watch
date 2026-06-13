from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import markets, news

app = FastAPI(title="India Watch", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(markets.router)
app.include_router(news.router)

@app.get("/")
async def root():
    return {"message": "India Watch API is running"}

@app.get("/health")
async def health():
    return {"status": "ok"}