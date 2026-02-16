"use client"

import { useState } from "react"
import { AppSidebar, type CategoryKey } from "@/components/app-sidebar"
import { CategoryCards } from "@/components/category-cards"
import { KnowledgeTable } from "@/components/knowledge-table"
import { ChatPanel } from "@/components/chat-panel"
import { StatsHeader } from "@/components/stats-header"
import { getEntriesByCategory, knowledgeBase } from "@/lib/knowledge-base"
import { Menu, X, Search, Bell } from "lucide-react"

const categoryLabels: Record<CategoryKey, string> = {
  all: "Overview",
  risks: "Risk Assessment",
  compliance: "Compliance Tracking",
  regulatory: "Regulatory Landscape",
  recommendation: "Recommendation Engine",
}

const categoryDescriptions: Record<CategoryKey, string> = {
  all: "Overview of your governance, risk, and compliance posture",
  risks: "Monitor and assess organizational risks across all domains",
  compliance: "Track compliance status against key frameworks and standards",
  regulatory: "Navigate the regulatory landscape and upcoming deadlines",
  recommendation:
    "AI-powered strategic recommendations to strengthen your GRC posture",
}

export function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const entries =
    activeCategory === "all"
      ? knowledgeBase
      : getEntriesByCategory(activeCategory)

  const tableTitle =
    activeCategory === "all"
      ? "All Knowledge Base Entries"
      : categoryLabels[activeCategory]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSidebarOpen(false)
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <AppSidebar
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat)
            setSidebarOpen(false)
          }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 px-6 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:text-card-foreground hover:bg-secondary transition-colors"
              aria-label="Open sidebar"
            >
              {sidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
            <div>
              <h2 className="text-base font-semibold text-card-foreground text-balance">
                {categoryLabels[activeCategory]}
              </h2>
              <p className="text-xs text-muted-foreground">
                {categoryDescriptions[activeCategory]}
              </p>
            </div>
          </div>

          {/* Top bar right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-secondary/60 rounded-xl px-3 py-2 ring-1 ring-border">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none w-40"
                aria-label="Search"
              />
            </div>
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:text-card-foreground hover:bg-secondary transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-400" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[hsl(173,70%,50%)] to-[hsl(260,60%,60%)] flex items-center justify-center text-[11px] font-bold text-[hsl(230,30%,8%)]">
                AN
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-card-foreground">Admin</p>
                <p className="text-[10px] text-muted-foreground">GRC Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-col xl:flex-row gap-5 h-full">
            {/* Left panel: cards + table */}
            <div className="flex-1 flex flex-col gap-5 min-w-0">
              {activeCategory === "all" && (
                <>
                  <StatsHeader />
                  <CategoryCards onCategoryChange={setActiveCategory} />
                </>
              )}
              <KnowledgeTable entries={entries} title={tableTitle} />
            </div>

            {/* Right panel: chat */}
            <div className="xl:w-[400px] flex-shrink-0 xl:h-full h-[600px]">
              <ChatPanel category={activeCategory} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
