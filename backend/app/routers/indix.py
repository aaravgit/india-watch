from fastapi import APIRouter
from app.scrapers.indix import calculate_indix
from app.scrapers.news import get_financial_news

router = APIRouter(prefix="/indix", tags=["INDI-X"])

@router.get("/")
async def get_indix():
    headlines = get_financial_news(limit=30)
    return calculate_indix(headlines=headlines)