type Quote = {
  price: number;
  change: number;
  change_pct: number;
};

function CommodityCard({ name, q }: { name: string; q: Quote }) {
  const up = q.change_pct >= 0;
  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-foreground">{name}</p>
      </div>
      <p className="mt-2 font-mono text-xl font-semibold text-foreground">
        ${q.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
      <p className={`mt-1 font-mono text-sm ${up ? "text-positive" : "text-negative"}`}>
        {up ? "+" : ""}
        {q.change.toFixed(2)} ({up ? "+" : ""}
        {q.change_pct.toFixed(2)}%)
      </p>
    </div>
  );
}

export function CommoditiesRow({ data }: { data: Record<string, Quote> }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Commodities</h2>
        <p className="text-muted-foreground text-sm">Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-foreground">Commodities</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Object.entries(data).map(([name, q]) => (
          <CommodityCard key={name} name={name} q={q} />
        ))}
      </div>
    </section>
  );
}