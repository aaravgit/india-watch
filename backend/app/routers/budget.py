from fastapi import APIRouter
from app.scrapers.budget import get_budget_status, scan_budget_news

router = APIRouter(prefix="/budget", tags=["Budget Tracker"])

@router.get("/status")
async def budget_status():
    return get_budget_status()

@router.get("/scan")
async def budget_scan():
    return scan_budget_news()