type Quote = {
  price: number;
  change_pct: number;
};

function TickerPill({ name, item }: { name: string; item: Quote }) {
  const up = item.change_pct >= 0;
  return (
    <div className="flex items-center gap-2 whitespace-nowrap px-4">
      <span className="text-xs font-medium text-muted-foreground">{name}</span>
      <span className="font-mono text-sm text-foreground">
        {item.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </span>
      <span className={`font-mono text-xs ${up ? "text-positive" : "text-negative"}`}>
        {up ? "+" : ""}
        {item.change_pct.toFixed(2)}%
      </span>
    </div>
  );
}

export function TickerBar({
  indices,
  commodities,
}: {
  indices: Record<string, Quote>;
  commodities: Record<string, Quote>;
}) {
  const all = { ...indices, ...commodities };
  const items = Object.entries(all);

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-b border-border bg-card">
      <div className="flex w-max animate-marquee items-center divide-x divide-border py-2.5 hover:[animation-play-state:paused]">
        {doubled.map(([name, item], i) => (
          <TickerPill key={`${name}-${i}`} name={name} item={item} />
        ))}
      </div>
    </div>
  );
}