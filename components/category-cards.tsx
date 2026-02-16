"use client"

import {
  ShieldAlert,
  ClipboardCheck,
  Scale,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react"
import type { CategoryKey } from "@/components/app-sidebar"

interface CategoryCardsProps {
  onCategoryChange: (category: CategoryKey) => void
}

const cards = [
  {
    key: "risks" as CategoryKey,
    label: "Risks",
    icon: ShieldAlert,
    description: "Identify, assess, and monitor organizational risks across security, operations, and strategy.",
    stat: "3 Critical",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
    statDot: "bg-rose-400",
    borderHover: "hover:ring-rose-500/30",
  },
  {
    key: "compliance" as CategoryKey,
    label: "Compliance",
    icon: ClipboardCheck,
    description: "Track compliance against SOC 2, GDPR, PCI DSS, HIPAA, and ISO 27001 frameworks.",
    stat: "2 Gaps Found",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    statDot: "bg-blue-400",
    borderHover: "hover:ring-blue-500/30",
  },
  {
    key: "regulatory" as CategoryKey,
    label: "Regulatory",
    icon: Scale,
    description: "Stay ahead of EU AI Act, SEC rules, DORA, CCPA/CPRA, and APAC data requirements.",
    stat: "2 Urgent",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    statDot: "bg-amber-400",
    borderHover: "hover:ring-amber-500/30",
  },
  {
    key: "recommendation" as CategoryKey,
    label: "Recommendation Engine",
    icon: Lightbulb,
    description: "AI-powered strategic recommendations for Zero Trust, automation, and vendor monitoring.",
    stat: "5 Actions",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    statDot: "bg-purple-400",
    borderHover: "hover:ring-purple-500/30",
  },
]

export function CategoryCards({ onCategoryChange }: CategoryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <button
          key={card.key}
          type="button"
          onClick={() => onCategoryChange(card.key)}
          className={`group flex flex-col items-start gap-4 rounded-2xl bg-card ring-1 ring-border p-5 text-left transition-all ${card.borderHover} hover:bg-secondary/30`}
        >
          <div className="flex w-full items-center justify-between">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg}`}
            >
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground text-sm">
              {card.label}
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
              {card.description}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className={`h-2 w-2 rounded-full ${card.statDot}`} />
            <span className="text-xs font-medium text-muted-foreground">
              {card.stat}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
