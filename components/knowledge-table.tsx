"use client"

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import type { KnowledgeEntry } from "@/lib/knowledge-base"
import { cn } from "@/lib/utils"

interface KnowledgeTableProps {
  entries: KnowledgeEntry[]
  title: string
}

function SeverityDot({ severity }: { severity?: string }) {
  if (!severity) return <span className="text-muted-foreground">--</span>
  const map: Record<string, { dot: string; text: string }> = {
    critical: { dot: "bg-rose-400", text: "text-rose-400" },
    high: { dot: "bg-amber-400", text: "text-amber-400" },
    medium: { dot: "bg-blue-400", text: "text-blue-400" },
    low: { dot: "bg-emerald-400", text: "text-emerald-400" },
  }
  const style = map[severity] || { dot: "bg-muted-foreground", text: "text-muted-foreground" }
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-2 w-2 rounded-full flex-shrink-0", style.dot)} />
      <span className={cn("text-xs capitalize font-medium", style.text)}>
        {severity}
      </span>
    </div>
  )
}

function StatusPill({ status }: { status?: string }) {
  if (!status) return <span className="text-muted-foreground">--</span>
  const map: Record<string, string> = {
    active: "bg-rose-500/15 text-rose-400",
    pending: "bg-amber-500/15 text-amber-400",
    mitigated: "bg-blue-500/15 text-blue-400",
    resolved: "bg-emerald-500/15 text-emerald-400",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] capitalize font-medium",
        map[status] || "bg-secondary text-muted-foreground"
      )}
    >
      {status}
    </span>
  )
}

export function KnowledgeTable({ entries, title }: KnowledgeTableProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl bg-card ring-1 ring-border p-8 text-center">
        <p className="text-muted-foreground">
          No entries found for this category.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-card ring-1 ring-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-card-foreground text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {entries.length} {entries.length === 1 ? "entry" : "entries"} in knowledge base
            </p>
          </div>
          <button
            type="button"
            className="text-xs text-[hsl(173,70%,50%)] font-medium hover:underline"
          >
            View Full Report
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[90px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-10">
                ID
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-10">
                Title
              </TableHead>
              <TableHead className="w-[110px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-10">
                Severity
              </TableHead>
              <TableHead className="w-[100px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-10">
                Status
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-10 hidden lg:table-cell">
                Framework
              </TableHead>
              <TableHead className="w-[100px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-10 hidden md:table-cell">
                Updated
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow
                key={entry.id}
                className="border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <TableCell className="font-mono text-xs text-muted-foreground py-3">
                  {entry.id}
                </TableCell>
                <TableCell className="py-3">
                  <p className="font-medium text-[13px] text-card-foreground">
                    {entry.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {entry.description}
                  </p>
                </TableCell>
                <TableCell className="py-3">
                  <SeverityDot severity={entry.severity} />
                </TableCell>
                <TableCell className="py-3">
                  <StatusPill status={entry.status} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground hidden lg:table-cell py-3">
                  {entry.framework || "--"}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground hidden md:table-cell py-3">
                  {entry.lastUpdated}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
