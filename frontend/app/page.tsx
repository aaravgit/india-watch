import { Navbar } from "@/components/india-watch/navbar"
import { TickerBar } from "@/components/india-watch/ticker-bar"
import { GiftNiftyCard } from "@/components/india-watch/gift-nifty-card"
import { IndiXCard } from "@/components/india-watch/indi-x-card"
import { IndicesRow } from "@/components/india-watch/indices-row"
import { StocksGrid } from "@/components/india-watch/stocks-grid"
import { CommoditiesRow } from "@/components/india-watch/commodities-row"
import { NewsFeed } from "@/components/india-watch/news-feed"
import { financialNews, defenseNews } from "@/lib/market-data"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <TickerBar />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">
        <GiftNiftyCard />
        <IndiXCard />
        <IndicesRow />
        <StocksGrid />
        <CommoditiesRow />

        <div id="news" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <NewsFeed title="Financial News" items={financialNews} />
          <NewsFeed id="defense" title="Defense & Geopolitical" items={defenseNews} />
        </div>

        <p className="pt-2 text-center font-mono text-xs text-muted-foreground">
          Last updated: 16 Jun 2026, 10:32:14 AM IST · Data shown is illustrative
        </p>
      </main>
    </div>
  )
}
