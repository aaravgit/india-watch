import yfinance as yf
from datetime import datetime

INDICES = {
    "NIFTY 50": "^NSEI",
    "SENSEX": "^BSESN",
    "BANK NIFTY": "^NSEBANK",
    "NIFTY IT": "^CNXIT",
}

STOCKS = {
    "Reliance": "RELIANCE.NS",
    "TCS": "TCS.NS",
    "HDFC Bank": "HDFCBANK.NS",
    "Infosys": "INFY.NS",
    "ICICI Bank": "ICICIBANK.NS",
    "Wipro": "WIPRO.NS",
    "Adani Ports": "ADANIPORTS.NS",
    "Bajaj Finance": "BAJFINANCE.NS",
}

def get_quote(ticker_symbol: str) -> dict:
    try:
        ticker = yf.Ticker(ticker_symbol)
        info = ticker.fast_info
        return {
            "price": round(info.last_price, 2),
            "open": round(info.open, 2),
            "high": round(info.day_high, 2),
            "low": round(info.day_low, 2),
            "prev_close": round(info.previous_close, 2),
            "change": round(info.last_price - info.previous_close, 2),
            "change_pct": round(
                ((info.last_price - info.previous_close) / info.previous_close) * 100, 2
            ),
            "volume": info.three_month_average_volume,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        return {"error": str(e)}

def get_all_indices() -> dict:
    result = {}
    for name, symbol in INDICES.items():
        result[name] = get_quote(symbol)
    return result

def get_all_stocks() -> dict:
    result = {}
    for name, symbol in STOCKS.items():
        result[name] = get_quote(symbol)
    return result