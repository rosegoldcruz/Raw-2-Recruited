import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

type TestCase = {
  name: string
  endpoint: string
  payload: Record<string, unknown>
}

type NocoAvailabilityRecord = {
  date?: string
  start_time?: string
  is_available?: boolean
}

const NOCODB_API_URL = "https://noco.aeondial.com"
const NOCODB_API_TOKEN = "nc_pat_YI7DZ6zoOcNRnYSr8gQCqHvdSR_W3UD6AqEZoR3a"
const AVAILABILITY_TABLE_ID = "mrqvkkduiipma9q"

type EnvMap = Record<string, string>

function parseDotEnv(content: string): EnvMap {
  const env: EnvMap = {}

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith("#")) continue

    const equalIndex = line.indexOf("=")
    if (equalIndex === -1) continue

    const key = line.slice(0, equalIndex).trim()
    let value = line.slice(equalIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    env[key] = value
  }

  return env
}

function loadSiteUrl(): string {
  const envFilePath = join(process.cwd(), ".env.local")
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (existsSync(envFilePath)) {
    const parsed = parseDotEnv(readFileSync(envFilePath, "utf8"))
    siteUrl = parsed.NEXT_PUBLIC_SITE_URL || siteUrl
  }

  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not set in .env.local or environment")
  }

  return siteUrl.replace(/\/$/, "")
}

async function runCase(baseUrl: string, testCase: TestCase): Promise<boolean> {
  const url = `${baseUrl}${testCase.endpoint}`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testCase.payload),
    })

    const bodyText = await response.text()
    const bodyPreview = bodyText.length > 300 ? `${bodyText.slice(0, 300)}...` : bodyText

    if (response.ok) {
      console.log(`PASS ${testCase.name} (${response.status})`)
      console.log(`  URL: ${url}`)
      if (bodyPreview) {
        console.log(`  Response: ${bodyPreview}`)
      }
      return true
    }

    console.error(`FAIL ${testCase.name} (${response.status})`)
    console.error(`  URL: ${url}`)
    if (bodyText) {
      console.error(`  Response: ${bodyText}`)
    }
    return false
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`FAIL ${testCase.name} (network error)`)
    console.error(`  URL: ${url}`)
    console.error(`  Error: ${message}`)
    return false
  }
}

async function fetchFirstAvailableSlot(): Promise<{ session_date: string; session_time: string }> {
  const withWhereUrl = new URL(`${NOCODB_API_URL}/api/v2/tables/${AVAILABILITY_TABLE_ID}/records`)
  withWhereUrl.searchParams.set("limit", "1")
  withWhereUrl.searchParams.set("where", "(is_available,eq,true)")

  const fallbackUrl = new URL(`${NOCODB_API_URL}/api/v2/tables/${AVAILABILITY_TABLE_ID}/records`)
  fallbackUrl.searchParams.set("limit", "500")

  const headers = {
    "xc-token": NOCODB_API_TOKEN,
  }

  const extractSlot = (rows: NocoAvailabilityRecord[]) => {
    const row = rows.find((entry) => entry.is_available === true && entry.date && entry.start_time)

    if (!row?.date || !row.start_time) {
      return null
    }

    return {
      session_date: row.date,
      session_time: row.start_time,
    }
  }

  const whereResponse = await fetch(withWhereUrl, { headers, cache: "no-store" })
  if (whereResponse.ok) {
    const payload = (await whereResponse.json()) as { list?: NocoAvailabilityRecord[] }
    const fromWhere = extractSlot(payload.list ?? [])
    if (fromWhere) return fromWhere
  }

  const fallbackResponse = await fetch(fallbackUrl, { headers, cache: "no-store" })
  if (!fallbackResponse.ok) {
    throw new Error(`Failed to read availability slots: ${fallbackResponse.status} ${await fallbackResponse.text()}`)
  }

  const fallbackPayload = (await fallbackResponse.json()) as { list?: NocoAvailabilityRecord[] }
  const fromFallback = extractSlot(fallbackPayload.list ?? [])

  if (!fromFallback) {
    throw new Error("No available slots found in NocoDB availability table")
  }

  return fromFallback
}

async function main() {
  const baseUrl = loadSiteUrl()
  const slot = await fetchFirstAvailableSlot()

  console.log(`Using booking slot from NocoDB: ${slot.session_date} ${slot.session_time}`)

  const tests: TestCase[] = [
    {
      name: "POST /api/booking",
      endpoint: "/api/booking",
      payload: {
        parent_name: "Test Parent",
        parent_email: "test@test.com",
        parent_phone: "6025551234",
        player_name: "Test Player",
        session_date: slot.session_date,
        session_time: slot.session_time,
      },
    },
    {
      name: "POST /api/apply/private-training",
      endpoint: "/api/apply/private-training",
      payload: {
        athlete_name: "Test Athlete",
        age: 14,
        position: "Wide Receiver",
        current_level: "JV",
        goals: "Make varsity",
        parent_name: "Test Parent",
        parent_email: "test@test.com",
        parent_phone: "6025551234",
      },
    },
    {
      name: "POST /api/apply/esa",
      endpoint: "/api/apply/esa",
      payload: {
        athlete_name: "Test Athlete",
        age: 12,
        grade: "7th",
        esa_status: "ESA",
        athletic_experience: "2 years flag football",
        primary_goal: "Make high school roster",
        parent_name: "Test Parent",
        parent_email: "test@test.com",
        parent_phone: "6025551234",
      },
    },
    {
      name: "POST /api/apply/flag-football",
      endpoint: "/api/apply/flag-football",
      payload: {
        athlete_name: "Test Athlete",
        age: 13,
        grade: "8th",
        school: "Test Middle School",
        goals: "College scholarship",
        parent_name: "Test Parent",
        parent_email: "test@test.com",
        parent_phone: "6025551234",
      },
    },
  ]

  console.log(`Base URL: ${baseUrl}`)
  console.log(`Running ${tests.length} form endpoint tests...`)

  let passed = 0
  for (const testCase of tests) {
    const ok = await runCase(baseUrl, testCase)
    if (ok) passed += 1
  }

  const failed = tests.length - passed
  console.log(`Summary: ${passed} passed, ${failed} failed`)

  if (failed > 0) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Fatal error: ${message}`)
  process.exit(1)
})
