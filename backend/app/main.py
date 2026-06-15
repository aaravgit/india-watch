from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
from app.routers import markets, news, websocket, indix, gift_nifty
from app.websocket.manager import price_broadcaster

@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(price_broadcaster())
    yield
    task.cancel()

app = FastAPI(title="India Watch", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(markets.router)
app.include_router(news.router)
app.include_router(websocket.router)
app.include_router(indix.router)
app.include_router(gift_nifty.router)
@app.get("/")
async def root():
    return {"message": "India Watch API is running"}

@app.get("/health")
async def health():
    return {"status": "ok"}