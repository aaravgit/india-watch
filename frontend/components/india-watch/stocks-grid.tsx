import { stocks, type Quote } from "@/lib/market-data"

function StockCard({ q }: { q: Quote }) {
  const up = q.changePct >= 0
  return (
    <div className="group flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-foreground">{q.name}</p>
        <p className="font-mono text-sm text-muted-foreground">
          {q.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
      </div>
      <span
        className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-xs ${
          up ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
        }`}
      >
        {up ? "+" : ""}
        {q.changePct.toFixed(2)}%
      </span>
    </div>
  )
}

export function StocksGrid() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-foreground">Top Stocks</h2>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {stocks.map((q) => (
          <StockCard key={q.name} q={q} />
        ))}
      </div>
    </section>
  )
}
