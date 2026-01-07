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

async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.DYLAN_TELEGRAM_BOT_TOKEN
  const chatId = process.env.DYLAN_CHAT_ID

  console.log("[Telegram] Attempting to send message", {
    hasToken: !!token,
    hasChatId: !!chatId,
    messageLength: text.length,
  })

  if (!token || !chatId) {
    console.error("[Telegram] CRITICAL: Missing environment variables", {
      DYLAN_TELEGRAM_BOT_TOKEN: token ? "SET" : "MISSING",
      DYLAN_CHAT_ID: chatId ? "SET" : "MISSING",
    })
    return false
  }

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

    const responseBody = await response.text()

    if (!response.ok) {
      console.error("[Telegram] sendMessage failed", {
        status: response.status,
        statusText: response.statusText,
        body: responseBody,
      })
      return false
    }

    console.log("[Telegram] Message sent successfully", {
      status: response.status,
      response: responseBody.substring(0, 200),
    })
    return true
  } catch (error) {
    console.error("[Telegram] sendMessage error", error)
    return false
  }
}

export const runtime = "nodejs"

export async function POST(request: Request) {
  console.log("[API /api/leads] Received POST request")

  let payload: LeadPayload | null = null

  try {
    const body = await request.json()
    if (body && typeof body === "object" && !Array.isArray(body)) {
      payload = body as LeadPayload
    } else {
      payload = { payload: body as JsonValue }
    }
  } catch {
    console.error("[API /api/leads] Invalid JSON in request body")
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  console.log("[API /api/leads] Parsed payload", {
    source: payload?.source || "unknown",
    hasData: !!payload,
  })

  const meta = {
    receivedAt: new Date().toISOString(),
    referer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
  }

  const message = `🔥 New Lead\n${safeStringify({ ...meta, ...payload })}`

  // Send to Telegram and wait for result
  const sent = await sendTelegramMessage(message)

  if (!sent) {
    console.error("[API /api/leads] FAILED to send Telegram message - returning error to client")
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to send notification. Please contact support or try again.",
      },
      { status: 500 }
    )
  }

  console.log("[API /api/leads] Successfully sent to Telegram, returning success")
  return NextResponse.json({ ok: true })
}
