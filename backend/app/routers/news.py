from fastapi import APIRouter
from app.scrapers.news import get_financial_news, get_defense_news

router = APIRouter(prefix="/news", tags=["News"])

@router.get("/financial")
async def financial_news(limit: int = 20):
    return get_financial_news(limit=limit)

@router.get("/defense")
async def defense_news(limit: int = 20):
    return get_defense_news(limit=limit)