import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const NOCODB_BASE = process.env.NOCODB_API_URL ?? 'https://noco.aeondial.com'
const NOCODB_TOKEN = process.env.NOCODB_API_TOKEN ?? ''
const ESA_TABLE = process.env.NOCODB_ESA_APPLICATIONS_TABLE_ID ?? 'mqzkwmikv6hihxf'

const DYLAN_TELEGRAM_BOT_TOKEN = process.env.DYLAN_TELEGRAM_BOT_TOKEN
const DYLAN_CHAT_ID = process.env.DYLAN_CHAT_ID

const nocoHeaders = {
  'xc-token': NOCODB_TOKEN,
  'Content-Type': 'application/json',
}

interface EsaPayload {
  athlete_name: string
  age: number
  grade: string
  esa_status: string
  athletic_experience: string
  primary_goal: string
  parent_name: string
  parent_email: string
  parent_phone: string
}

function missingRequired(payload: Partial<EsaPayload>) {
  return (
    !payload.athlete_name ||
    payload.age === undefined ||
    payload.age === null ||
    !payload.grade ||
    !payload.esa_status ||
    !payload.athletic_experience ||
    !payload.primary_goal ||
    !payload.parent_name ||
    !payload.parent_email ||
    !payload.parent_phone
  )
}

async function sendTelegramMessage(payload: EsaPayload) {
  if (!DYLAN_TELEGRAM_BOT_TOKEN || !DYLAN_CHAT_ID) return

  const text =
    `🏈 New Application — ESA Program\n\n` +
    `👤 Athlete: ${payload.athlete_name}, Age ${payload.age}\n` +
    `👨 Parent: ${payload.parent_name}\n` +
    `📧 Email: ${payload.parent_email}\n` +
    `📞 Phone: ${payload.parent_phone}`

  try {
    await fetch(`https://api.telegram.org/bot${DYLAN_TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: DYLAN_CHAT_ID, text }),
    })
  } catch (err) {
    console.error('[esa/telegram]', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as Partial<EsaPayload>

    if (missingRequired(payload)) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const body: EsaPayload = {
      athlete_name: String(payload.athlete_name),
      age: Number(payload.age),
      grade: String(payload.grade),
      esa_status: String(payload.esa_status),
      athletic_experience: String(payload.athletic_experience),
      primary_goal: String(payload.primary_goal),
      parent_name: String(payload.parent_name),
      parent_email: String(payload.parent_email),
      parent_phone: String(payload.parent_phone),
    }

    const createResponse = await fetch(`${NOCODB_BASE}/api/v2/tables/${ESA_TABLE}/records`, {
      method: 'POST',
      headers: nocoHeaders,
      body: JSON.stringify({
        ...body,
        created_at: new Date().toISOString(),
      }),
    })

    if (!createResponse.ok) {
      console.error('[esa] create failed', createResponse.status, await createResponse.text())
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
    }

    void sendTelegramMessage(body)

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[esa]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
