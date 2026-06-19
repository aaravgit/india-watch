"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/india-watch/navbar";
import { TickerBar } from "@/components/india-watch/ticker-bar";
import { GiftNiftyCard } from "@/components/india-watch/gift-nifty-card";
import { IndiXCard } from "@/components/india-watch/indi-x-card";
import { IndicesRow } from "@/components/india-watch/indices-row";
import { StocksGrid } from "@/components/india-watch/stocks-grid";
import { CommoditiesRow } from "@/components/india-watch/commodities-row";
import { NewsFeed } from "@/components/india-watch/news-feed";
import {
  getIndices, getStocks, getCommodities,
  getFinancialNews, getDefenseNews, getIndix, getGiftNifty
} from "@/lib/api";

export default function Page() {
  const [indices, setIndices] = useState({});
  const [stocks, setStocks] = useState({});
  const [commodities, setCommodities] = useState({});
  const [financialNews, setFinancialNews] = useState([]);
  const [defenseNews, setDefenseNews] = useState([]);
  const [indix, setIndix] = useState(null);
  const [giftNifty, setGiftNifty] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  async function fetchAll() {
    try {
      const [com, fn, dn, ix, gn] = await Promise.all([
        getCommodities(),
        getFinancialNews(),
        getDefenseNews(),
        getIndix(),
        getGiftNifty(),
      ]);
      setCommodities(com);
      setFinancialNews(fn);
      setDefenseNews(dn);
      setIndix(ix);
      setGiftNifty(gn);
      setLastUpdated(new Date().toLocaleTimeString("en-IN"));
    } catch (e) {
      console.error("API fetch error:", e);
    }
  }

  useEffect(() => {
  fetchAll();
  const interval = setInterval(fetchAll, 30000);
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const ws = new WebSocket("ws://localhost:8000/ws/prices");

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "price_update") {
        setIndices(data.indices);
        setStocks(data.stocks);
      }
    } catch (err) {
      console.error("WebSocket message parse error:", err);
    }
  };

  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  return () => {
    ws.close();
  };
}, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar marketStatus={giftNifty} />
      <TickerBar indices={indices} commodities={commodities} />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">
        <GiftNiftyCard data={giftNifty} />
        <IndiXCard data={indix} />
        <IndicesRow data={indices} />
        <StocksGrid data={stocks} />
        <CommoditiesRow data={commodities} />
        <div id="news" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <NewsFeed title="Financial News" items={financialNews} />
          <NewsFeed id="defense" title="Defense & Geopolitical" items={defenseNews} />
        </div>
        <p className="pt-2 text-center font-mono text-xs text-muted-foreground">
          Last updated: {lastUpdated} · Live data from India Watch API
        </p>
      </main>
    </div>
  );
}