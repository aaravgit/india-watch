from fastapi import APIRouter
from app.scrapers.gift_nifty import get_gift_nifty, get_market_status

router = APIRouter(prefix="/premarket", tags=["Pre-Market"])

@router.get("/gift-nifty")
async def gift_nifty():
    return get_gift_nifty()

@router.get("/market-status")
async def market_status():
    return get_market_status()