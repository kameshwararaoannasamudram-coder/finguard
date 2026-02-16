import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai"
import 'dotenv/config';
import { getKnowledgeBaseAsContext } from "@/lib/knowledge-base"

export const maxDuration = 30

export async function POST(req: Request) {
  const {
    messages,
    category,
  }: { messages: UIMessage[]; category?: string } = await req.json()

  const knowledgeContext = getKnowledgeBaseAsContext(
    category as "risks" | "compliance" | "regulatory" | "recommendation" | undefined
  )

  const systemPrompt = `You are an expert GRC (Governance, Risk & Compliance) AI advisor. You help organizations manage risks, ensure compliance, navigate regulatory requirements, and provide strategic recommendations.

You have access to the following knowledge base data. When answering questions, you MUST reference specific entries from this data using their IDs (e.g., RSK-001, CMP-002) and present relevant information in a structured format.

${category ? `The user is currently viewing the "${category}" category.` : "The user is viewing all categories."}

=== KNOWLEDGE BASE ===
${knowledgeContext}
=== END KNOWLEDGE BASE ===

Guidelines:
1. Always reference specific knowledge base entries by their ID when relevant.
2. When presenting data, structure it clearly with entry IDs, titles, severity levels, and statuses.
3. Provide actionable recommendations based on the data.
4. If the user asks about something not in the knowledge base, say so clearly and provide general guidance.
5. For risk queries, prioritize by severity (critical > high > medium > low).
6. For compliance queries, highlight frameworks and deadlines.
7. For regulatory queries, include jurisdictional context.
8. For recommendation queries, provide implementation prioritization.
9. When returning multiple items, format them as a structured list with key details.
10. Always end with a brief actionable summary or next steps.`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
