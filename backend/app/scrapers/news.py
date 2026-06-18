import feedparser
import httpx
import re
from datetime import datetime

NEWS_SOURCES = {
    "Economic Times Markets": "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
    "Economic Times Economy": "https://economictimes.indiatimes.com/economy/rssfeeds/1373380680.cms",
    "Economic Times Finance": "https://economictimes.indiatimes.com/personal-finance/rssfeeds/1389644680.cms",
    "Mint Markets": "https://www.livemint.com/rss/markets",
    "Mint Economy": "https://www.livemint.com/rss/economy",
    "PIB India": "https://www.pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3",
    "Business Standard": "https://www.business-standard.com/rss/markets-106.rss",
    "Business Standard Economy": "https://www.business-standard.com/rss/economy-policy-10201.rss",
    "Financial Express": "https://www.financialexpress.com/market/feed/",
    "Moneycontrol": "https://www.moneycontrol.com/rss/latestnews.xml",
}

DEFENSE_SOURCES = {
    "PIB Defense": "https://www.pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3",
    "ANI News": "https://aninews.in/rss/india.rss",
    "The Print Defense": "https://theprint.in/feed/",
    "The Wire": "https://thewire.in/feed",
    "NDTV India": "https://feeds.feedburner.com/ndtvnews-top-stories",
    "Times of India India": "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
    "Hindustan Times": "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
    "Times of India World": "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
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


def get_financial_news(limit: int = 100) -> list:
    all_articles = []
    for name, url in NEWS_SOURCES.items():
        articles = parse_feed(url, limit=10)
        all_articles.extend(articles)
    all_articles.sort(key=lambda x: x.get("published", ""), reverse=True)
    return all_articles[:limit]


DEFENSE_KEYWORDS = [
    "defense", "defence", "military", "army", "navy", "air force",
    "missile", "border", "LAC", "LOC", "soldier", "weapon", "nuclear",
    "DRDO", "HAL", "BrahMos", "fighter jet", "troops", "security forces",
    "terrorist", "terrorism", "Rajnath", "China border", "Pakistan border",
    "ceasefire violation", "infiltration", "armed forces",
]

GEOPOLITICAL_KEYWORDS = [
    "geopolitical", "geopolitics", "Iran", "Israel", "NATO", "Taiwan",
    "Russia Ukraine", "Ukraine war", "Gaza", "ceasefire", "sanctions",
    "United Nations", "UN Security Council", "diplomatic", "foreign policy",
    "South China Sea", "Middle East conflict", "war crimes", "coup",
    "nuclear deal", "embassy attack", "airstrike", "conflict zone",
]

ALL_DEFENSE_GEO_KEYWORDS = DEFENSE_KEYWORDS + GEOPOLITICAL_KEYWORDS


_KEYWORD_PATTERNS = [
    re.compile(r"\b" + re.escape(kw.lower()) + r"\b")
    for kw in ALL_DEFENSE_GEO_KEYWORDS
]


def _matches_defense_or_geo(text: str) -> bool:
    text = text.lower()
    return any(pattern.search(text) for pattern in _KEYWORD_PATTERNS)


def get_defense_news(limit: int = 100) -> list:
    all_articles = []
    for name, url in DEFENSE_SOURCES.items():
        articles = parse_feed(url, limit=20)
        for article in articles:
            title = article.get("title", "")
            summary = article.get("summary", "")
            if _matches_defense_or_geo(title) or _matches_defense_or_geo(summary):
                all_articles.append(article)
    all_articles.sort(key=lambda x: x.get("published", ""), reverse=True)
    return all_articles[:limit]