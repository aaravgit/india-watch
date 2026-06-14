import yfinance as yf
from datetime import datetime

POSITIVE_WORDS = [
    "surge", "rally", "gain", "rise", "high", "bull", "growth",
    "profit", "record", "strong", "boost", "jump", "recovery",
    "buy", "upgrade", "positive", "optimistic", "beat"
]

NEGATIVE_WORDS = [
    "fall", "drop", "crash", "loss", "bear", "weak", "sell",
    "downgrade", "negative", "concern", "risk", "decline",
    "slump", "tumble", "plunge", "recession", "crisis", "fear"
]

def get_momentum_score() -> dict:
    try:
        nifty = yf.Ticker("^NSEI")
        vix = yf.Ticker("^INDIAVIX")
        
        nifty_info = nifty.fast_info
        vix_info = vix.fast_info
        
        nifty_change = ((nifty_info.last_price - nifty_info.previous_close) 
                        / nifty_info.previous_close) * 100
        
        # Convert % change to 0-100 score
        # -3% or below = 0, +3% or above = 100
        momentum = max(0, min(100, (nifty_change + 3) * (100/6)))
        
        # VIX above 25 = panic (score 0), VIX below 10 = calm (score 100)
        try:
            vix_value = vix_info.last_price
            vix_score = max(0, min(100, (25 - vix_value) * (100/15)))
        except:
            vix_score = 50  # neutral if VIX unavailable
            vix_value = None

        return {
            "momentum_score": round(momentum, 1),
            "vix_score": round(vix_score, 1),
            "nifty_change_pct": round(nifty_change, 2),
            "vix_value": vix_value,
        }
    except Exception as e:
        return {"error": str(e), "momentum_score": 50, "vix_score": 50}

def get_sentiment_score(headlines: list) -> dict:
    if not headlines:
        return {"sentiment_score": 50, "positive": 0, "negative": 0}
    
    positive_count = 0
    negative_count = 0
    
    for headline in headlines:
        title = headline.get("title", "").lower()
        summary = headline.get("summary", "").lower()
        text = title + " " + summary
        
        positive_count += sum(1 for w in POSITIVE_WORDS if w in text)
        negative_count += sum(1 for w in NEGATIVE_WORDS if w in text)
    
    total = positive_count + negative_count
    if total == 0:
        sentiment = 50
    else:
        sentiment = (positive_count / total) * 100
    
    return {
        "sentiment_score": round(sentiment, 1),
        "positive_signals": positive_count,
        "negative_signals": negative_count,
    }

def calculate_indix(headlines: list = None) -> dict:
    if headlines is None:
        headlines = []
    
    market = get_momentum_score()
    sentiment = get_sentiment_score(headlines)
    
    momentum_score = market.get("momentum_score", 50)
    vix_score = market.get("vix_score", 50)
    sentiment_score = sentiment.get("sentiment_score", 50)
    
    # INDI-X Formula
    # Momentum 40% + Sentiment 30% + VIX 30%
    indix = (
        momentum_score * 0.40 +
        sentiment_score * 0.30 +
        vix_score * 0.30
    )
    indix = round(indix, 1)
    
    # Grade
    if indix >= 75:
        grade = "Green Zone"
        color = "green"
    elif indix >= 60:
        grade = "Blue Zone"
        color = "blue"
    elif indix >= 45:
        grade = "Yellow Zone"
        color = "yellow"
    elif indix >= 30:
        grade = "Orange Zone"
        color = "orange"
    else:
        grade = "Red Zone"
        color = "red"
    
    return {
        "indi_x": indix,
        "grade": grade,
        "color": color,
        "components": {
            "momentum": momentum_score,
            "sentiment": sentiment_score,
            "vix": vix_score,
        },
        "market_data": {
            "nifty_change_pct": market.get("nifty_change_pct"),
            "vix_value": market.get("vix_value"),
            "positive_signals": sentiment.get("positive_signals"),
            "negative_signals": sentiment.get("negative_signals"),
        },
        "timestamp": datetime.now().isoformat(),
    }