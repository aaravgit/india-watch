import { indices, type Quote } from "@/lib/market-data"

function IndexCard({ q }: { q: Quote }) {
  const up = q.changePct >= 0
  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{q.name}</p>
      <p className="mt-2 font-mono text-xl font-semibold text-foreground">
        {q.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
      <p className={`mt-1 font-mono text-sm ${up ? "text-positive" : "text-negative"}`}>
        {up ? "+" : ""}
        {q.change.toFixed(2)} ({up ? "+" : ""}
        {q.changePct.toFixed(2)}%)
      </p>
    </div>
  )
}

export function IndicesRow() {
  return (
    <section id="markets">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Market Indices</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {indices.map((q) => (
          <IndexCard key={q.name} q={q} />
        ))}
      </div>
    </section>
  )
}
