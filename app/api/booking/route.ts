import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const NOCODB_BASE = process.env.NOCODB_API_URL ?? 'https://noco.aeondial.com'
const NOCODB_TOKEN = process.env.NOCODB_API_TOKEN ?? ''
const BOOKINGS_TABLE = process.env.NOCODB_BOOKINGS_TABLE_ID ?? 'mqm6l8zmt6p7f4r'
const AVAIL_TABLE = process.env.NOCODB_AVAIL_TABLE_ID ?? 'mrqvkkduiipma9q'

const DYLAN_TELEGRAM_BOT_TOKEN = process.env.DYLAN_TELEGRAM_BOT_TOKEN
const DYLAN_CHAT_ID = process.env.DYLAN_CHAT_ID

const nocoHeaders = {
  'xc-token': NOCODB_TOKEN,
  'Content-Type': 'application/json',
}

interface BookingPayload {
  parent_name: string
  parent_email: string
  parent_phone: string
  player_name: string
  session_date: string
  session_time: string
}

interface AvailabilityRow {
  Id?: number
  id?: number
  date: string
  start_time: string
  max_slots: number
  booked_slots: number
  is_available: boolean
}

function missingRequired(payload: Partial<BookingPayload>) {
  return (
    !payload.parent_name ||
    !payload.parent_email ||
    !payload.parent_phone ||
    !payload.player_name ||
    !payload.session_date ||
    !payload.session_time
  )
}

async function sendTelegramMessage(payload: BookingPayload) {
  if (!DYLAN_TELEGRAM_BOT_TOKEN || !DYLAN_CHAT_ID) return

  const text =
    `🏈 New Booking - Raw2Recruited\n\n` +
    `👤 Parent: ${payload.parent_name}\n` +
    `📧 Email: ${payload.parent_email}\n` +
    `📞 Phone: ${payload.parent_phone}\n` +
    `🧒 Player: ${payload.player_name}\n` +
    `📅 Date: ${payload.session_date}\n` +
    `⏰ Time: ${payload.session_time}`

  try {
    await fetch(`https://api.telegram.org/bot${DYLAN_TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: DYLAN_CHAT_ID,
        text,
      }),
    })
  } catch (err) {
    console.error('[booking/telegram]', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as Partial<BookingPayload>

    if (missingRequired(payload)) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const bookingPayload: BookingPayload = {
      parent_name: payload.parent_name as string,
      parent_email: payload.parent_email as string,
      parent_phone: payload.parent_phone as string,
      player_name: payload.player_name as string,
      session_date: payload.session_date as string,
      session_time: payload.session_time as string,
    }

    const createBookingResponse = await fetch(`${NOCODB_BASE}/api/v2/tables/${BOOKINGS_TABLE}/records`, {
      method: 'POST',
      headers: nocoHeaders,
      body: JSON.stringify({
        ...bookingPayload,
        status: 'pending',
      }),
    })

    if (!createBookingResponse.ok) {
      console.error('[booking] create booking failed', createBookingResponse.status, await createBookingResponse.text())
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    const availabilityResponse = await fetch(`${NOCODB_BASE}/api/v2/tables/${AVAIL_TABLE}/records?limit=1000`, {
      headers: { 'xc-token': NOCODB_TOKEN },
      cache: 'no-store',
    })

    if (!availabilityResponse.ok) {
      console.error('[booking] availability lookup failed', availabilityResponse.status, await availabilityResponse.text())
      return NextResponse.json({ error: 'Failed to update availability' }, { status: 500 })
    }

    const availabilityData = await availabilityResponse.json()
    const records = (availabilityData.list ?? []) as AvailabilityRow[]

    const matchedRow = records.find(
      (row) => row.date === bookingPayload.session_date && row.start_time === bookingPayload.session_time
    )

    if (matchedRow) {
      const rowId = matchedRow.Id ?? matchedRow.id

      if (rowId !== undefined) {
        const nextBookedSlots = Number(matchedRow.booked_slots ?? 0) + 1
        const maxSlots = Number(matchedRow.max_slots ?? 0)
        const isAvailable = nextBookedSlots < maxSlots

        const updateResponse = await fetch(`${NOCODB_BASE}/api/v2/tables/${AVAIL_TABLE}/records`, {
          method: 'PATCH',
          headers: nocoHeaders,
          body: JSON.stringify({
            Id: rowId,
            booked_slots: nextBookedSlots,
            is_available: isAvailable,
          }),
        })

        if (!updateResponse.ok) {
          console.error('[booking] availability update failed', updateResponse.status, await updateResponse.text())
          return NextResponse.json({ error: 'Failed to update availability' }, { status: 500 })
        }
      }
    }

    void sendTelegramMessage(bookingPayload)

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[booking]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}