const API_BASE = "http://localhost:8000";

export async function getIndices() {
  const res = await fetch(`${API_BASE}/markets/indices`);
  return res.json();
}

export async function getStocks() {
  const res = await fetch(`${API_BASE}/markets/stocks`);
  return res.json();
}

export async function getCommodities() {
  const res = await fetch(`${API_BASE}/markets/commodities`);
  return res.json();
}

export async function getFinancialNews() {
  const res = await fetch(`${API_BASE}/news/financial`);
  return res.json();
}

export async function getDefenseNews() {
  const res = await fetch(`${API_BASE}/news/defense`);
  return res.json();
}

export async function getIndix() {
  const res = await fetch(`${API_BASE}/indix/`);
  return res.json();
}

export async function getGiftNifty() {
  const res = await fetch(`${API_BASE}/premarket/gift-nifty`);
  return res.json();
}

export async function getMarketStatus() {
  const res = await fetch(`${API_BASE}/premarket/market-status`);
  return res.json();
}