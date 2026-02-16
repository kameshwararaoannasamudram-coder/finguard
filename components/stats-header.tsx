"use client"

import { ShieldAlert, ClipboardCheck, Scale, Lightbulb } from "lucide-react"

const stats = [
  {
    label: "Active Risks",
    value: "38",
    sublabel: "New Issues",
    icon: ShieldAlert,
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    ringColor: "ring-rose-500/30",
  },
  {
    label: "Compliance Gaps",
    value: "21",
    sublabel: "Important Tasks",
    icon: ClipboardCheck,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    ringColor: "ring-amber-500/30",
  },
  {
    label: "Regulatory Items",
    value: "12",
    sublabel: "Pending Alerts",
    icon: Scale,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    ringColor: "ring-purple-500/30",
  },
  {
    label: "Recommendations",
    value: "$63,465",
    sublabel: "Revenue Status",
    icon: Lightbulb,
    iconBg: "bg-[hsl(173,70%,50%)]/20",
    iconColor: "text-[hsl(173,70%,50%)]",
    ringColor: "ring-[hsl(173,70%,50%)]/30",
  },
]

export function StatsHeader() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 rounded-2xl bg-card p-5 ring-1 ring-border"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconBg} ring-1 ${stat.ringColor}`}
          >
            <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-card-foreground tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {stat.sublabel}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
