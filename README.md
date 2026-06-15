# 🇮🇳 India Watch

A real-time Indian financial market and defense intelligence platform. India Watch monitors stock markets, tracks breaking news, and provides unique market insights — all in one place.

---

## Features

### 📈 Markets
- Live Nifty 50, Sensex, Bank Nifty, Nifty IT tracking
- Real-time stock prices for major Indian companies
- Open, High, Low, Close, Volume data
- Change % with momentum indicators

### 📰 News Intelligence
- Aggregated financial news from Economic Times, Mint, Business Standard
- Defense & geopolitical news with keyword filtering
- Real-time RSS feed aggregation from 10+ sources

### 🔢 INDI-X Score *(coming soon)*
India Watch's proprietary market health score — a single number from 0 to 100 combining:
- Market momentum
- News sentiment
- FII/DII institutional flows
- India VIX (fear index)

### 🌅 GIFT Nifty Pre-Market Tracker *(coming soon)*
Before Indian markets open at 9:15 AM IST, track GIFT Nifty futures to predict the market opening — gap up or gap down.

### 🏛️ Budget Day Live Tracker *(coming soon)*
On Union Budget day, track every announcement in real time and see its instant impact on related sectors and stocks.

### 🛡️ Defense Intelligence *(coming soon)*
Real-time defense and geopolitical news with an interactive map showing events across India and its borders.

---

## Tech Stack

**Backend**
- Python 3.14
- FastAPI + Uvicorn
- SQLAlchemy + PostgreSQL
- Redis + Celery
- WebSockets for live streaming
- yfinance, feedparser, BeautifulSoup

**Frontend** *(coming soon)*
- React + Vite
- TradingView Lightweight Charts
- Leaflet.js for maps
- Tailwind CSS

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/markets/indices` | Live Nifty, Sensex, Bank Nifty |
| GET | `/markets/stocks` | Top Indian stocks live prices |
| GET | `/markets/stock/{symbol}` | Single stock data |
| GET | `/news/financial` | Latest financial news |
| GET | `/news/defense` | Defense & geopolitical news |
| WS | `/ws/prices` | Live price WebSocket stream |
| GET | `/premarket/gift-nifty` | GIFT Nifty pre-market signal |
| GET | `/premarket/market-status` | Current market open/closed status |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/aaravgit/india-watch.git
cd india-watch

# Create virtual environment
python -m venv venv
venv\Scripts\Activate.ps1  # Windows
source venv/bin/activate    # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run the backend
cd backend
uvicorn app.main:app --reload
```

Visit `http://localhost:8000/docs` for the interactive API documentation.

---

## Project Status

🟢 **Active development**

| Feature | Status |
|---------|--------|
| Markets scraper | ✅ Complete |
| Financial news | ✅ Complete |
| Defense news | ✅ Complete |
| WebSocket live streaming | ✅ Complete |
| INDI-X Score | ✅ Complete |
| GIFT Nifty tracker | ✅ Complete |
| Budget day tracker | ✅ Complete |
| Frontend dashboard | 📅 Planned |
| Defense map | 📅 Planned |
| Deployment | 📅 Planned |

---

## Data Sources

All free, no paid APIs:
- **NSE/BSE** via yfinance and nsepython
- **News** via Economic Times, Mint, Business Standard RSS
- **Defense** via The Print, The Wire, NDTV RSS feeds
- **GIFT Nifty** via NSE GIFT City

---

*Built with 🇮🇳 for Indian markets*

>Last debug check: All endpoints passing ✅