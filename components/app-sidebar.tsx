"use client"

import {
  ShieldAlert,
  ClipboardCheck,
  Scale,
  Lightbulb,
  LayoutDashboard,
  Brain,
  Settings,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type CategoryKey =
  | "all"
  | "risks"
  | "compliance"
  | "regulatory"
  | "recommendation"

interface AppSidebarProps {
  activeCategory: CategoryKey
  onCategoryChange: (category: CategoryKey) => void
}

const categories = [
  {
    key: "all" as CategoryKey,
    label: "Dashboard",
    icon: LayoutDashboard,
    color: "text-[hsl(173,70%,50%)]",
    activeBg: "bg-[hsl(173,70%,50%)]/10",
  },
  {
    key: "risks" as CategoryKey,
    label: "Risks",
    icon: ShieldAlert,
    color: "text-rose-400",
    activeBg: "bg-rose-400/10",
  },
  {
    key: "compliance" as CategoryKey,
    label: "Compliance",
    icon: ClipboardCheck,
    color: "text-blue-400",
    activeBg: "bg-blue-400/10",
  },
  {
    key: "regulatory" as CategoryKey,
    label: "Regulatory",
    icon: Scale,
    color: "text-amber-400",
    activeBg: "bg-amber-400/10",
  },
  {
    key: "recommendation" as CategoryKey,
    label: "Recommendations",
    icon: Lightbulb,
    color: "text-purple-400",
    activeBg: "bg-purple-400/10",
  },
]

export function AppSidebar({
  activeCategory,
  onCategoryChange,
}: AppSidebarProps) {
  return (
    <aside className="w-[220px] flex-shrink-0 bg-sidebar-background flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 pt-6 pb-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(173,70%,50%)]">
            <Brain className="h-5 w-5 text-[hsl(230,30%,8%)]" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-foreground">
              GRC<span className="text-[hsl(173,70%,50%)]">Hub</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3" aria-label="Main navigation">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
          Navigation
        </p>
        <ul className="flex flex-col gap-0.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key
            return (
              <li key={cat.key}>
                <button
                  type="button"
                  onClick={() => onCategoryChange(cat.key)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-all text-left group",
                    isActive
                      ? `${cat.activeBg} ${cat.color} font-semibold`
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <cat.icon
                    className={cn(
                      "h-[18px] w-[18px] flex-shrink-0",
                      isActive ? cat.color : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <span className="truncate">{cat.label}</span>
                  {isActive && (
                    <div className={cn("ml-auto h-1.5 w-1.5 rounded-full", cat.color.replace("text-", "bg-"))} />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom nav */}
      <div className="px-3 pb-5">
        <div className="border-t border-sidebar-border pt-4 flex flex-col gap-0.5">
          <button
            type="button"
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          >
            <Settings className="h-[18px] w-[18px]" />
            <span>Settings</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          >
            <HelpCircle className="h-[18px] w-[18px]" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
