import yfinance as yf
from datetime import datetime
import pytz

IST = pytz.timezone("Asia/Kolkata")

def get_market_status() -> dict:
    now_ist = datetime.now(IST)
    hour = now_ist.hour
    minute = now_ist.minute
    weekday = now_ist.weekday()

    if weekday >= 5:
        return {"status": "closed", "reason": "Weekend"}

    total_minutes = hour * 60 + minute

    if total_minutes < 9 * 60:
        open_minutes = 9 * 60 + 15 - total_minutes
        return {
            "status": "pre_market",
            "reason": "Market not yet open",
            "opens_in_minutes": open_minutes
        }
    elif total_minutes <= 15 * 60 + 30:
        return {"status": "open", "reason": "Market is open"}
    else:
        return {"status": "closed", "reason": "Market closed for the day"}

def get_gift_nifty() -> dict:
    try:
        # GIFT Nifty data isn't available via yfinance (NSE IX contracts
        # aren't on Yahoo Finance). Approximate using Nifty 50 itself.
        nifty = yf.Ticker("^NSEI")

        nifty_info = nifty.fast_info
        prev_close = nifty_info.previous_close
        last_price = nifty_info.last_price

        gift_price = last_price

        gap = round(gift_price - prev_close, 2)
        gap_pct = round((gap / prev_close) * 100, 2)

        if gap > 50:
            signal = "Gap Up"
            direction = "up"
        elif gap < -50:
            signal = "Gap Down"
            direction = "down"
        else:
            signal = "Flat Open"
            direction = "flat"

        market_status = get_market_status()

        now_ist = datetime.now(IST)

        return {
            "gift_nifty_price": round(gift_price, 2),
            "nifty_prev_close": round(prev_close, 2),
            "nifty_last": round(last_price, 2),
            "gap_points": gap,
            "gap_pct": gap_pct,
            "signal": signal,
            "direction": direction,
            "market_status": market_status,
            "time_ist": now_ist.strftime("%I:%M %p IST"),
            "timestamp": datetime.now().isoformat(),
        }

    except Exception as e:
        return {"error": str(e)}