import { Clock } from "lucide-react"
import type { NewsItem } from "@/lib/market-data"

export function NewsFeed({
  title,
  items,
  id,
}: {
  title: string
  items: NewsItem[]
  id?: string
}) {
  return (
    <section id={id} className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="h-4 w-1 rounded-full bg-primary" />
        {title}
      </h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <a
              href="#"
              className="block rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-secondary"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-primary">{item.source}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground text-pretty">{item.headline}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
