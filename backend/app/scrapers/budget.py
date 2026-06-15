import yfinance as yf
from datetime import datetime
import feedparser

BUDGET_DATE = "2027-02-01"

KEYWORD_SECTOR_MAP = {
    "infrastructure": {
        "stocks": ["LT.NS", "NTPC.NS", "POWERGRID.NS"],
        "names": ["L&T", "NTPC", "Power Grid"]
    },
    "defence": {
        "stocks": ["HAL.NS", "BEL.NS", "BHARATFORG.NS"],
        "names": ["HAL", "BEL", "Bharat Forge"]
    },
    "defense": {
        "stocks": ["HAL.NS", "BEL.NS", "BHARATFORG.NS"],
        "names": ["HAL", "BEL", "Bharat Forge"]
    },
    "electric vehicle": {
        "stocks": ["TATAMOTORS.NS", "M&M.NS"],
        "names": ["Tata Motors", "M&M"]
    },
    "EV": {
        "stocks": ["TATAMOTORS.NS", "M&M.NS"],
        "names": ["Tata Motors", "M&M"]
    },
    "income tax": {
        "stocks": ["HINDUNILVR.NS", "ITC.NS", "TITAN.NS"],
        "names": ["HUL", "ITC", "Titan"]
    },
    "agriculture": {
        "stocks": ["UPL.NS", "COROMANDEL.NS"],
        "names": ["UPL", "Coromandel"]
    },
    "railways": {
        "stocks": ["IRFC.NS", "RVNL.NS"],
        "names": ["IRFC", "RVNL"]
    },
    "healthcare": {
        "stocks": ["APOLLOHOSP.NS", "SUNPHARMA.NS"],
        "names": ["Apollo", "Sun Pharma"]
    },
    "renewable": {
        "stocks": ["ADANIGREEN.NS", "TATAPOWER.NS"],
        "names": ["Adani Green", "Tata Power"]
    },
    "solar": {
        "stocks": ["ADANIGREEN.NS", "TATAPOWER.NS"],
        "names": ["Adani Green", "Tata Power"]
    },
    "bank": {
        "stocks": ["SBIN.NS", "HDFCBANK.NS", "ICICIBANK.NS"],
        "names": ["SBI", "HDFC Bank", "ICICI Bank"]
    },
    "housing": {
        "stocks": ["DLF.NS", "LODHA.NS"],
        "names": ["DLF", "Lodha"]
    },
}

BUDGET_NEWS_SOURCES = [
    "https://economictimes.indiatimes.com/economy/rssfeeds/1373380680.cms",
    "https://www.livemint.com/rss/economy",
    "https://www.business-standard.com/rss/economy-policy-10201.rss",
]

def is_budget_day() -> bool:
    today = datetime.now().strftime("%Y-%m-%d")
    return today == BUDGET_DATE

def get_stock_price(symbol: str) -> dict:
    try:
        ticker = yf.Ticker(symbol)
        info = ticker.fast_info
        return {
            "price": round(info.last_price, 2),
            "change_pct": round(
                ((info.last_price - info.previous_close) / info.previous_close) * 100, 2
            )
        }
    except:
        return {"price": None, "change_pct": None}

def scan_budget_news() -> list:
    hits = []
    seen_titles = set()

    for url in BUDGET_NEWS_SOURCES:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:20]:
                title = entry.get("title", "").lower()
                summary = entry.get("summary", "").lower()
                text = title + " " + summary

                if entry.get("title") in seen_titles:
                    continue
                seen_titles.add(entry.get("title"))

                for keyword, sector_data in KEYWORD_SECTOR_MAP.items():
                    if keyword.lower() in text:
                        stock_impacts = []
                        for symbol, name in zip(
                            sector_data["stocks"], sector_data["names"]
                        ):
                            price_data = get_stock_price(symbol)
                            stock_impacts.append({
                                "name": name,
                                "symbol": symbol,
                                **price_data
                            })

                        hits.append({
                            "keyword_triggered": keyword,
                            "headline": entry.get("title", ""),
                            "summary": entry.get("summary", "")[:200],
                            "link": entry.get("link", ""),
                            "published": entry.get("published", ""),
                            "affected_stocks": stock_impacts,
                            "timestamp": datetime.now().isoformat(),
                        })
                        break
        except Exception as e:
            continue

    return hits

def get_budget_status() -> dict:
    budget_day = is_budget_day()
    hits = scan_budget_news() if budget_day else []

    return {
        "is_budget_day": budget_day,
        "budget_date": BUDGET_DATE,
        "message": "Budget day tracker is active!" if budget_day else f"Next budget expected on {BUDGET_DATE}",
        "live_hits": hits,
        "total_hits": len(hits),
        "timestamp": datetime.now().isoformat(),
    }