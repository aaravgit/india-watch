import feedparser
import httpx
from datetime import datetime

NEWS_SOURCES = {
    "Economic Times Markets": "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
    "Economic Times Economy": "https://economictimes.indiatimes.com/economy/rssfeeds/1373380680.cms",
    "Mint Markets": "https://www.livemint.com/rss/markets",
    "PIB India": "https://www.pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3",
    "Business Standard": "https://www.business-standard.com/rss/markets-106.rss",
}

DEFENSE_SOURCES = {
    "PIB Defense": "https://www.pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3",
    "ANI News": "https://aninews.in/rss/india.rss",
    "The Print Defense": "https://theprint.in/feed/",
}

def parse_feed(url: str, limit: int = 10) -> list:
    try:
        feed = feedparser.parse(url)
        articles = []
        for entry in feed.entries[:limit]:
            articles.append({
                "title": entry.get("title", "No title"),
                "summary": entry.get("summary", "")[:300],
                "link": entry.get("link", ""),
                "published": entry.get("published", datetime.now().isoformat()),
                "source": feed.feed.get("title", "Unknown"),
            })
        return articles
    except Exception as e:
        return [{"error": str(e)}]

def get_financial_news(limit: int = 10) -> list:
    all_articles = []
    for name, url in NEWS_SOURCES.items():
        articles = parse_feed(url, limit=5)
        all_articles.extend(articles)
    all_articles.sort(key=lambda x: x.get("published", ""), reverse=True)
    return all_articles[:limit]

def get_defense_news(limit: int = 10) -> list:
    all_articles = []
    for name, url in DEFENSE_SOURCES.items():
        articles = parse_feed(url, limit=5)
        all_articles.extend(articles)
    return all_articles[:limit]