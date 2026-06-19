# 🇮🇳 India Watch

A real-time Indian financial market and defense intelligence platform. India Watch monitors stock markets, tracks breaking news, and provides unique market insights — all in one place.

---

## Features

### 📈 Markets
- Live Nifty 50, Sensex, Bank Nifty, Nifty IT, Nifty Midcap tracking
- Real-time prices for 20+ major Indian stocks and commodities (Gold, Silver, Crude Oil)
- Open, High, Low, Close, Volume data
- Change % with momentum indicators
- Live updates via WebSocket (indices & stocks), 30s polling for everything else

### 📰 News Intelligence
- Aggregated financial news from Economic Times, Mint, Business Standard, and more
- Defense & geopolitical news with keyword filtering (India-specific defense terms + broader international geopolitical terms, combined into one feed)
- Real-time RSS feed aggregation from 10+ sources

### 🔢 INDI-X Score
India Watch's proprietary market health score — a single number from 0 to 100 combining:
- Market momentum
- News sentiment
- India VIX (fear index)

### 🌅 GIFT Nifty Pre-Market Tracker
Before Indian markets open at 9:15 AM IST, track a Nifty 50-based pre-market signal to gauge the likely market opening — gap up, gap down, or flat. (Note: true GIFT Nifty futures data isn't available via free APIs; this is an approximation using Nifty 50 itself.)

### 🏛️ Budget Day Live Tracker
On Union Budget day, scans news for budget-related keywords and maps them to affected sector stocks.

### 🛡️ Defense Intelligence *(map coming soon)*
Real-time defense and geopolitical news feed is live. An interactive map (Leaflet.js) showing event locations across India and its borders is planned but not yet built.

---

## Tech Stack

**Backend**
- Python 3.14
- FastAPI + Uvicorn
- SQLAlchemy + PostgreSQL
- Redis + Celery
- WebSockets for live price streaming
- yfinance, feedparser

**Frontend**
- Next.js + React
- Tailwind CSS
- WebSocket client for live market data

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/markets/indices` | Live Nifty, Sensex, Bank Nifty, etc. |
| GET | `/markets/stocks` | Top Indian stocks live prices |
| GET | `/markets/commodities` | Gold, Silver, Crude Oil prices (USD) |
| GET | `/news/financial` | Latest financial news |
| GET | `/news/defense` | Defense & geopolitical news |
| GET | `/indix/` | INDI-X market health score |
| GET | `/premarket/gift-nifty` | Pre-market gap signal |
| GET | `/premarket/market-status` | Current market open/closed status |
| GET | `/budget/status`, `/budget/scan` | Budget day tracker |
| WS | `/ws/prices` | Live price WebSocket stream (indices + stocks, every 10s) |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/aaravgit/india-watch.git
cd india-watch

# Backend setup
cd backend
python -m venv venv
venv\Scripts\Activate.ps1   # Windows
source venv/bin/activate    # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend setup (separate terminal)
cd frontend
npm install
npm run dev
```

Backend: `http://localhost:8000` (interactive docs at `/docs`)
Frontend: `http://localhost:3000`

---

## Project Status

🟢 **Active development**

| Feature | Status |
|---------|--------|
| Markets scraper | ✅ Complete |
| Financial news | ✅ Complete |
| Defense & geopolitical news (with keyword filtering) | ✅ Complete |
| WebSocket live streaming (backend) | ✅ Complete |
| WebSocket wired to frontend | ✅ Complete |
| INDI-X Score | ✅ Complete |
| GIFT Nifty pre-market signal | ✅ Complete |
| Budget day tracker | ✅ Complete |
| Frontend dashboard | ✅ Complete |
| Backend caching + parallel ticker fetching | ✅ Complete |
| Defense map (Leaflet.js) | ⏳ Not started |
| Clickable headlines → full article view | ⏳ Not started |
| Clickable stocks → price chart/history view | ⏳ Not started |
| Live USD→INR conversion for commodities | ⏳ Not started |
| RSS source-field cleanup | ⏳ Not started |
| Deployment (Railway + Vercel) | ⏳ Deferred — local-only for now |

---

## Known Limitations

- **Commodities are priced in USD**, not converted to INR yet (Gold/Silver/Crude futures contracts are USD-denominated on the data source; conversion planned).
- **GIFT Nifty signal is an approximation**, not real GIFT City futures data — no free API exists for this.
- **News source labels** can occasionally be noisy (raw RSS feed metadata) for some publishers.
- **Tata Motors** is listed as two separate entities (CV and PV) following its 2025 demerger — there is no single combined ticker anymore.

---

## Data Sources

All free, no paid APIs:
- **NSE/BSE** via yfinance
- **News** via Economic Times, Mint, Business Standard, Times of India, Hindustan Times, NDTV, The Print, The Wire, ANI, PIB RSS feeds
- **GIFT Nifty** approximated via Nifty 50 (^NSEI) — no free real GIFT City data source available

---

*Built with 🇮🇳 for Indian markets*

> Last debug check: All endpoints passing ✅
