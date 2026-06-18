"use client";
import { Clock } from "lucide-react";

type NewsItem = {
  title: string;
  source: string;
  published: string;
  link: string;
};

export function NewsFeed({ title, items, id }: { title: string; items: NewsItem[]; id?: string }) {
  if (!items || items.length === 0) {
    return (
      <section id={id} className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">Loading news...</p>
      </section>
    );
  }

  return (
    <section id={id} className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold text-foreground">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="rounded-lg border border-transparent p-3 hover:bg-secondary">
            <div className="mb-1 flex flex-col gap-0.5">
              <span className="text-xs font-medium text-primary break-words">{item.source}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {item.published ? item.published.slice(0, 16) : ""}
              </span>
            </div>
            <p className="text-sm text-foreground">{item.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}