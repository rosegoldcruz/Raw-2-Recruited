import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const NOCODB_BASE = process.env.NOCODB_API_URL ?? 'https://noco.aeondial.com'
const NOCODB_TOKEN = process.env.NOCODB_API_TOKEN ?? ''
const AVAIL_TABLE = process.env.NOCODB_AVAIL_TABLE_ID ?? 'mrqvkkduiipma9q'

export async function GET() {
  try {
    const res = await fetch(`${NOCODB_BASE}/api/v2/tables/${AVAIL_TABLE}/records?limit=1000`, {
      headers: { 'xc-token': NOCODB_TOKEN },
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('[availability] NocoDB error:', res.status, await res.text())
      return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json(data.list ?? [])
  } catch (err) {
    console.error('[availability]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}