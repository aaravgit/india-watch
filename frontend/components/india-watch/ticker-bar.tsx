import { tickerItems, type Quote } from "@/lib/market-data"

function TickerPill({ item }: { item: Quote }) {
  const up = item.changePct >= 0
  return (
    <div className="flex items-center gap-2 whitespace-nowrap px-4">
      <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
      <span className="font-mono text-sm text-foreground">
        {item.price.toLocaleString("en-IN", { minimumFractionDigits: item.price < 10000 ? 0 : 0 })}
      </span>
      <span className={`font-mono text-xs ${up ? "text-positive" : "text-negative"}`}>
        {up ? "+" : ""}
        {item.changePct.toFixed(2)}%
      </span>
    </div>
  )
}

export function TickerBar() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="overflow-hidden border-b border-border bg-card">
      <div className="flex w-max animate-marquee items-center divide-x divide-border py-2.5 hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <TickerPill key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}
