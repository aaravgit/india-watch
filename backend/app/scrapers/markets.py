import yfinance as yf
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
import time

INDICES = {
    "NIFTY 50": "^NSEI",
    "SENSEX": "^BSESN",
    "BANK NIFTY": "^NSEBANK",
    "NIFTY IT": "^CNXIT",
    "NIFTY MIDCAP": "^NSEMDCP50",
}

COMMODITIES = {
    "Gold": "GC=F",
    "Silver": "SI=F",
    "Crude Oil": "CL=F",
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
    "SBI": "SBIN.NS",
    "Kotak Bank": "KOTAKBANK.NS",
    "LT": "LT.NS",
    "Axis Bank": "AXISBANK.NS",
    "HUL": "HINDUNILVR.NS",
    "Maruti": "MARUTI.NS",
    "Tata Motors (CV)": "TMCV.NS",
    "Tata Motors (PV)": "TMPV.NS",
    "Sun Pharma": "SUNPHARMA.NS",
    "ONGC": "ONGC.NS",
    "NTPC": "NTPC.NS",
    "HAL": "HAL.NS",
    "Adani Enterprises": "ADANIENT.NS",
}

# ---- simple in-memory cache ----
_CACHE: dict = {}
_CACHE_TTL_SECONDS = 8

def _get_cached(key: str):
    entry = _CACHE.get(key)
    if entry and (time.time() - entry["ts"]) < _CACHE_TTL_SECONDS:
        return entry["data"]
    return None

def _set_cached(key: str, data):
    _CACHE[key] = {"data": data, "ts": time.time()}


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
            "error": None,
        }
    except Exception as e:
        return {
            "price": None,
            "open": None,
            "high": None,
            "low": None,
            "prev_close": None,
            "change": None,
            "change_pct": None,
            "volume": None,
            "timestamp": datetime.now().isoformat(),
            "error": str(e),
        }


def _get_quotes_parallel(items: dict) -> dict:
    """Fetch all symbols in `items` concurrently instead of one-by-one."""
    result = {}
    with ThreadPoolExecutor(max_workers=min(10, len(items))) as executor:
        futures = {
            name: executor.submit(get_quote, symbol)
            for name, symbol in items.items()
        }
        for name, future in futures.items():
            result[name] = future.result()
    return result


def get_all_indices() -> dict:
    cached = _get_cached("indices")
    if cached is not None:
        return cached
    result = _get_quotes_parallel(INDICES)
    _set_cached("indices", result)
    return result


def get_all_stocks() -> dict:
    cached = _get_cached("stocks")
    if cached is not None:
        return cached
    result = _get_quotes_parallel(STOCKS)
    _set_cached("stocks", result)
    return result


def get_all_commodities() -> dict:
    cached = _get_cached("commodities")
    if cached is not None:
        return cached
    result = _get_quotes_parallel(COMMODITIES)
    _set_cached("commodities", result)
    return result