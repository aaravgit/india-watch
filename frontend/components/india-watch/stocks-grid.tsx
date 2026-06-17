type Quote = {
  price: number;
  change_pct: number;
};

function StockCard({ name, q }: { name: string; q: Quote }) {
  const hasPrice = q.price !== null && q.price !== undefined;
  const up = q.change_pct >= 0;
  return (
    <div className="group flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-foreground">{name}</p>
        <p className="font-mono text-sm text-muted-foreground">
          {hasPrice
            ? q.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })
            : "—"}
        </p>
      </div>
      {hasPrice && (
        <span
          className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-xs ${
            up ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
          }`}
        >
          {up ? "+" : ""}
          {q.change_pct.toFixed(2)}%
        </span>
      )}
    </div>
  );
}

export function StocksGrid({ data }: { data: Record<string, Quote> }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Top Stocks</h2>
        <p className="text-muted-foreground text-sm">Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-foreground">Top Stocks</h2>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {Object.entries(data).map(([name, q]) => (
          <StockCard key={name} name={name} q={q} />
        ))}
      </div>
    </section>
  );
}