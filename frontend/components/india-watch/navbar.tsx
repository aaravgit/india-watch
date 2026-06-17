"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

const navLinks = ["Markets", "News", "Defense", "INDI-X"]

export function Navbar({ marketStatus }: { marketStatus?: any }) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggleTheme() {
    const root = document.documentElement
    const next = !isDark
    root.classList.toggle("dark", next)
    root.classList.toggle("light", !next)
    setIsDark(next)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="India Watch" className="h-9 w-auto" />
          <span className="text-lg font-bold tracking-tight">
            INDIA <span className="text-muted-foreground font-medium">WATCH</span>
            </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
            </span>
            <span className="font-mono text-xs text-foreground">
              {marketStatus?.market_status?.status === "open" ? "Market Open" :
              marketStatus?.market_status?.status === "pre_market" ? "Pre-Market" :
              "Market Closed"}
              {" · "}
              {marketStatus?.time_ist ?? "—"}
            </span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          >
            {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
