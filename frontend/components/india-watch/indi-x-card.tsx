import { indiX } from "@/lib/market-data"

function ScoreRing({ score }: { score: number }) {
  const radius = 56
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <div className="absolute inset-2 rounded-full bg-positive/10 blur-xl" aria-hidden="true" />
      <svg className="h-40 w-40 -rotate-90" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="var(--positive)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-4xl font-bold text-foreground">{score.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}

function ComponentBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export function IndiXCard() {
  return (
    <section id="indi-x" className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">INDI-X Market Score</h2>
          <p className="text-xs text-muted-foreground">Composite market health index</p>
        </div>
        <span className="rounded-full bg-positive/15 px-3 py-1 text-xs font-medium text-positive">
          {indiX.zone}
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
        <ScoreRing score={indiX.score} />
        <div className="w-full flex-1 space-y-4">
          {indiX.components.map((c) => (
            <ComponentBar key={c.label} label={c.label} value={c.value} />
          ))}
        </div>
      </div>
    </section>
  )
}
