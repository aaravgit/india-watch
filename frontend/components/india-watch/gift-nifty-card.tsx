import { ArrowUpRight, TrendingUp } from "lucide-react"
import { giftNifty } from "@/lib/market-data"

export function GiftNiftyCard() {
  const up = giftNifty.gap >= 0
  return (
    <section className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-positive/10 text-positive">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">GIFT Nifty · Pre-Market</p>
            <p className="font-mono text-2xl font-semibold text-foreground">
              {giftNifty.value.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-1 sm:items-end">
          <div
            className={`flex items-center gap-1 rounded-full px-3 py-1 font-mono text-sm font-medium ${
              up ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
            }`}
          >
            <ArrowUpRight className="h-4 w-4" />
            Gap Up {up ? "+" : ""}
            {giftNifty.gap} pts ({up ? "+" : ""}
            {giftNifty.gapPct.toFixed(2)}%)
          </div>
          <p className="text-sm text-muted-foreground">Markets likely to open Gap Up</p>
        </div>
      </div>
    </section>
  )
}
