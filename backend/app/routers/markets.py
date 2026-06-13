from fastapi import APIRouter
from app.scrapers.markets import get_all_indices, get_all_stocks, get_quote

router = APIRouter(prefix="/markets", tags=["Markets"])

@router.get("/indices")
async def get_indices():
    return get_all_indices()

@router.get("/stocks")
async def get_stocks():
    return get_all_stocks()

@router.get("/stock/{symbol}")
async def get_single_stock(symbol: str):
    return get_quote(symbol)