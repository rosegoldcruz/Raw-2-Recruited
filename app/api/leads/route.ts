import { NextResponse } from "next/server"

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue }

type LeadPayload = Record<string, JsonValue>

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.DYLAN_TELEGRAM_BOT_TOKEN
  const chatId = process.env.DYLAN_CHAT_ID

  if (!token || !chatId) return

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    })

    if (!response.ok) {
      // Log silently (server logs only); never throw.
      console.error("Telegram sendMessage failed", {
        status: response.status,
        statusText: response.statusText,
        body: await response.text().catch(() => ""),
      })
    }
  } catch (error) {
    console.error("Telegram sendMessage error", error)
  }
}

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: LeadPayload | null = null

  try {
    const body = await request.json()
    if (body && typeof body === "object" && !Array.isArray(body)) {
      payload = body as LeadPayload
    } else {
      payload = { payload: body as JsonValue }
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  // Treat receipt of the payload as a successful submission (no persistence configured yet).
  // Telegram notification must not block or fail the response.
  const meta = {
    receivedAt: new Date().toISOString(),
    referer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
  }

  const message = `🔥 New Lead\n${safeStringify({ ...meta, ...payload })}`

  // Fire-and-forget; do not block the response.
  void sendTelegramMessage(message)

  return NextResponse.json({ ok: true })
}
