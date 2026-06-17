type Quote = {
  price: number;
  change: number;
  change_pct: number;
};

function IndexCard({ name, q }: { name: string; q: Quote }) {
  const up = q.change_pct >= 0;
  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{name}</p>
      <p className="mt-2 font-mono text-xl font-semibold text-foreground">
        {q.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
      <p className={`mt-1 font-mono text-sm ${up ? "text-positive" : "text-negative"}`}>
        {up ? "+" : ""}
        {q.change.toFixed(2)} ({up ? "+" : ""}
        {q.change_pct.toFixed(2)}%)
      </p>
    </div>
  );
}

export function IndicesRow({ data }: { data: Record<string, Quote> }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <section id="markets">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Market Indices</h2>
        <p className="text-muted-foreground text-sm">Loading...</p>
      </section>
    );
  }

  return (
    <section id="markets">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Market Indices</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Object.entries(data).map(([name, q]) => (
          <IndexCard key={name} name={name} q={q} />
        ))}
      </div>
    </section>
  );
}