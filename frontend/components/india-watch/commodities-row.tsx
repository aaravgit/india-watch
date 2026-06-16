import { commodities, type Quote } from "@/lib/market-data"

function CommodityCard({ q }: { q: Quote }) {
  const up = q.changePct >= 0
  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-foreground">{q.name}</p>
        <p className="text-xs text-muted-foreground">{q.symbol}</p>
      </div>
      <p className="mt-2 font-mono text-xl font-semibold text-foreground">
        ₹{q.price.toLocaleString("en-IN")}
      </p>
      <p className={`mt-1 font-mono text-sm ${up ? "text-positive" : "text-negative"}`}>
        {up ? "+" : ""}
        {q.change.toLocaleString("en-IN")} ({up ? "+" : ""}
        {q.changePct.toFixed(2)}%)
      </p>
    </div>
  )
}

export function CommoditiesRow() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-foreground">Commodities</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {commodities.map((q) => (
          <CommodityCard key={q.name} q={q} />
        ))}
      </div>
    </section>
  )
}
