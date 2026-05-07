const NOCODB_API_URL = "https://noco.aeondial.com"
const NOCODB_API_TOKEN = "nc_pat_YI7DZ6zoOcNRnYSr8gQCqHvdSR_W3UD6AqEZoR3a"
const AVAILABILITY_TABLE_ID = "mrqvkkduiipma9q"

const SLOT_TEMPLATES = [
  { start_time: "09:00", end_time: "10:00" },
  { start_time: "11:00", end_time: "12:00" },
  { start_time: "13:00", end_time: "14:00" },
  { start_time: "15:00", end_time: "16:00" },
  { start_time: "17:00", end_time: "18:00" },
]

const START_DATE = new Date("2026-05-07T00:00:00Z")
const END_DATE = new Date("2026-12-31T00:00:00Z")
const HEADERS = {
  "xc-token": NOCODB_API_TOKEN,
  "Content-Type": "application/json",
}

type AvailabilityRecord = {
  Id?: number
  id?: number
}

type SeedRow = {
  date: string
  day_of_week: string
  start_time: string
  end_time: string
  max_slots: number
  booked_slots: number
  is_available: boolean
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function dayName(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  })
}

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size))
  }
  return result
}

async function fetchAllExistingRows(): Promise<number[]> {
  const response = await fetch(
    `${NOCODB_API_URL}/api/v2/tables/${AVAILABILITY_TABLE_ID}/records?limit=1000`,
    {
      headers: { "xc-token": NOCODB_API_TOKEN },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to read existing rows: ${response.status} ${await response.text()}`)
  }

  const payload = (await response.json()) as { list?: AvailabilityRecord[] }
  const list = payload.list ?? []

  const ids: number[] = []
  for (const row of list) {
    const id = row.Id ?? row.id
    if (typeof id === "number") {
      ids.push(id)
    }
  }

  return ids
}

async function deleteExistingRows(): Promise<number> {
  let totalDeleted = 0

  while (true) {
    const ids = await fetchAllExistingRows()
    if (ids.length === 0) break

    for (const id of ids) {
      const response = await fetch(
        `${NOCODB_API_URL}/api/v2/tables/${AVAILABILITY_TABLE_ID}/records`,
        {
          method: "DELETE",
          headers: HEADERS,
          body: JSON.stringify([{ Id: id }]),
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to delete row ${id}: ${response.status} ${await response.text()}`)
      }

      totalDeleted += 1
    }
  }

  return totalDeleted
}

function buildSeedRows(): SeedRow[] {
  const rows: SeedRow[] = []

  const current = new Date(START_DATE)
  while (current <= END_DATE) {
    const date = toIsoDate(current)
    const dow = dayName(current)

    for (const slot of SLOT_TEMPLATES) {
      rows.push({
        date,
        day_of_week: dow,
        start_time: slot.start_time,
        end_time: slot.end_time,
        max_slots: 3,
        booked_slots: 0,
        is_available: true,
      })
    }

    current.setUTCDate(current.getUTCDate() + 1)
  }

  return rows
}

async function insertRows(rows: SeedRow[]): Promise<void> {
  const batches = chunk(rows, 100)

  for (const batch of batches) {
    const response = await fetch(`${NOCODB_API_URL}/api/v2/tables/${AVAILABILITY_TABLE_ID}/records`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(batch),
    })

    if (!response.ok) {
      throw new Error(`Failed to insert batch: ${response.status} ${await response.text()}`)
    }
  }
}

async function main() {
  console.log("Deleting existing availability rows...")
  const deleted = await deleteExistingRows()
  console.log(`Deleted rows: ${deleted}`)

  const rows = buildSeedRows()
  console.log(`Seeding rows: ${rows.length}`)

  await insertRows(rows)

  console.log(`Done. Total rows created: ${rows.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
