"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { CategoryKey } from "@/components/app-sidebar"

interface ChatPanelProps {
  category: CategoryKey
}

const suggestedQueries: Record<CategoryKey, string[]> = {
  all: [
    "What are the top critical risks?",
    "Show me all compliance gaps",
    "Summarize regulatory deadlines",
    "What are the priority recommendations?",
  ],
  risks: [
    "List all critical and high severity risks",
    "What risks are currently active?",
    "Which risks have recommendations?",
    "Show vendor-related risks",
  ],
  compliance: [
    "Which compliance items need immediate attention?",
    "Show GDPR compliance status",
    "List all SOC 2 findings",
    "What frameworks are we tracking?",
  ],
  regulatory: [
    "What are the upcoming regulatory deadlines?",
    "Show EU regulations affecting us",
    "List US regulatory requirements",
    "What is the EU AI Act impact?",
  ],
  recommendation: [
    "Prioritize recommendations by impact",
    "What is Zero Trust Architecture?",
    "Show automation recommendations",
    "Which recommendations reduce risk most?",
  ],
}

export function ChatPanel({ category }: ChatPanelProps) {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ id, messages: msgs }) => ({
        body: {
          messages: msgs,
          id,
          category: category === "all" ? undefined : category,
        },
      }),
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (text: string) => {
    if (!text.trim() || isLoading) return
    sendMessage({ text: text.trim() })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(input)
    }
  }

  const handleReset = () => {
    setMessages([])
    setInput("")
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-full rounded-2xl bg-card ring-1 ring-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(173,70%,50%)]/15">
            <Sparkles className="h-4 w-4 text-[hsl(173,70%,50%)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">
              AI Assistant
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Knowledge Base Query
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-muted-foreground hover:text-card-foreground h-8 px-2"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 min-h-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-5 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(173,70%,50%)]/10 ring-1 ring-[hsl(173,70%,50%)]/20">
              <Bot className="h-7 w-7 text-[hsl(173,70%,50%)]" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-card-foreground text-sm">
                GRC Knowledge Assistant
              </p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[280px] leading-relaxed">
                Ask about risks, compliance, regulations, or get AI recommendations from your knowledge base.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              {suggestedQueries[category].map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => handleSubmit(query)}
                  className="text-left text-xs px-3.5 py-2.5 rounded-xl bg-secondary/50 ring-1 ring-border text-card-foreground hover:bg-secondary transition-colors leading-relaxed"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message) => {
              const isUser = message.role === "user"
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    isUser ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
                      isUser
                        ? "bg-[hsl(173,70%,50%)] text-[hsl(230,30%,8%)]"
                        : "bg-purple-500/15 text-purple-400"
                    )}
                  >
                    {isUser ? (
                      <User className="h-3.5 w-3.5" />
                    ) : (
                      <Bot className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[85%]",
                      isUser
                        ? "bg-[hsl(173,70%,50%)] text-[hsl(230,30%,8%)]"
                        : "bg-secondary ring-1 ring-border text-card-foreground"
                    )}
                  >
                    {message.parts.map((part, idx) => {
                      if (part.type === "text") {
                        return (
                          <div
                            key={idx}
                            className="whitespace-pre-wrap prose prose-sm prose-invert max-w-none [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
                          >
                            {part.text}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              )
            })}
            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "user" && (
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-400">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl bg-secondary ring-1 ring-border px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Analyzing knowledge base...</span>
                    </div>
                  </div>
                </div>
              )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(input)
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about risks, compliance, regulations..."
              rows={1}
              className="w-full resize-none rounded-xl bg-secondary ring-1 ring-border px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(173,70%,50%)]/50 text-foreground"
              disabled={isLoading}
              aria-label="Type your question"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-[46px] w-[46px] rounded-xl bg-[hsl(173,70%,50%)] text-[hsl(230,30%,8%)] hover:bg-[hsl(173,70%,45%)] flex-shrink-0 disabled:opacity-30"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
