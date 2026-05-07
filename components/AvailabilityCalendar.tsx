"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  addMonths,
} from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AvailabilityRecord = {
  Id?: number
  id?: number
  date: string
  start_time: string
  end_time: string
  booked_slots: number
  max_slots: number
  is_available: boolean
}

type BookingFormData = {
  parent_name: string
  parent_email: string
  parent_phone: string
  player_name: string
}

const defaultFormData: BookingFormData = {
  parent_name: "",
  parent_email: "",
  parent_phone: "",
  player_name: "",
}

function formatTime12h(value: string) {
  const [rawHour, rawMinute] = value.split(":")
  const hour = Number(rawHour)
  const minute = Number(rawMinute)

  if (Number.isNaN(hour) || Number.isNaN(minute)) return value

  const suffix = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`
}

function dateKey(value: Date) {
  return format(value, "yyyy-MM-dd")
}

export function AvailabilityCalendar() {
  const [records, setRecords] = useState<AvailabilityRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))
  const [selectedDay, setSelectedDay] = useState(startOfDay(new Date()))
  const [selected, setSelected] = useState<AvailabilityRecord | null>(null)
  const [formData, setFormData] = useState<BookingFormData>(defaultFormData)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [lastBookedSlot, setLastBookedSlot] = useState<{
    date: string
    startTime: string
    endTime: string
  } | null>(null)

  const loadAvailability = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/availability', { cache: 'no-store' })
      const data = await response.json()
      setRecords(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('[AvailabilityCalendar] failed to load availability', err)
      setRecords([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadAvailability()
  }, [loadAvailability])

  const availabilityByDay = useMemo(() => {
    const map = new Map<string, AvailabilityRecord[]>()

    for (const record of records) {
      const key = record.date
      const existing = map.get(key) ?? []
      existing.push(record)
      map.set(key, existing)
    }

    for (const [key, value] of map.entries()) {
      map.set(
        key,
        [...value].sort((a, b) => a.start_time.localeCompare(b.start_time))
      )
    }

    return map
  }, [records])

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

    const days: Date[] = []
    let day = gridStart
    while (day <= gridEnd) {
      days.push(day)
      day = addDays(day, 1)
    }

    return days
  }, [currentMonth])

  const selectedDaySlots = useMemo(() => {
    return availabilityByDay.get(dateKey(selectedDay)) ?? []
  }, [availabilityByDay, selectedDay])

  useEffect(() => {
    if (selectedDaySlots.length > 0) return

    const monthRows = records.filter((record) => {
      try {
        return isSameMonth(parseISO(record.date), currentMonth)
      } catch {
        return false
      }
    })

    if (monthRows.length > 0) {
      const firstDate = monthRows
        .map((row) => row.date)
        .sort((a, b) => a.localeCompare(b))[0]
      if (firstDate) {
        setSelectedDay(parseISO(firstDate))
      }
    }
  }, [currentMonth, records, selectedDaySlots.length])

  const onFieldChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selected) return

    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          session_date: selected.date,
          session_time: selected.start_time,
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        setError(body?.error ?? 'Failed to submit booking')
        return
      }

      setSuccess(true)
      setLastBookedSlot({
        date: selected.date,
        startTime: selected.start_time,
        endTime: selected.end_time,
      })
      setSelected(null)
      setFormData(defaultFormData)
      await loadAvailability()
    } catch (err) {
      console.error('[AvailabilityCalendar] booking failed', err)
      setError('Network error while submitting booking')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <h3 className="mb-2 text-2xl font-black text-foreground">Booking Submitted</h3>
        <p className="mb-5 text-muted-foreground">
          Your booking request for {lastBookedSlot ? format(parseISO(lastBookedSlot.date), "EEEE, MMM d, yyyy") : "your selected day"}{" "}
          at {lastBookedSlot ? `${formatTime12h(lastBookedSlot.startTime)} - ${formatTime12h(lastBookedSlot.endTime)}` : "your selected time"}{" "}
          has been received. We will follow up with confirmation details shortly.
        </p>
        <Button onClick={() => setSuccess(false)}>Book Another Session</Button>
      </div>
    )
  }

  return (
    <div className="w-full min-w-full space-y-5 rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
          className="border-white/15 bg-[#111] text-white hover:bg-white/10"
        >
          Prev Month
        </Button>
        <p className="text-center text-sm font-semibold text-white sm:text-base">
          {format(currentMonth, "MMMM yyyy")}
        </p>
        <Button
          variant="outline"
          onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
          className="border-white/15 bg-[#111] text-white hover:bg-white/10"
        >
          Next Month
        </Button>
      </div>

      {loading ? (
        <p className="py-6 text-center text-sm text-zinc-400">Loading availability...</p>
      ) : (
        <div className="grid w-full min-w-full gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="rounded-xl border border-white/10 bg-[#111] p-4">
            <div className="mb-3 grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
                <div key={label} className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => {
                const key = dateKey(day)
                const hasSlots = (availabilityByDay.get(key)?.length ?? 0) > 0
                const selectedDayMatch = isSameDay(day, selectedDay)
                const inMonth = isSameMonth(day, currentMonth)

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    disabled={!hasSlots}
                    onClick={() => {
                      setSelectedDay(day)
                      setSelected(null)
                      setError(null)
                    }}
                    className={`relative h-12 rounded-md border text-sm transition-colors ${
                      selectedDayMatch
                        ? "border-[#DC2626] bg-[#DC2626] text-white"
                        : hasSlots
                          ? "border-[#DC2626]/35 bg-[#DC2626]/10 text-white hover:bg-[#DC2626]/20"
                          : "cursor-not-allowed border-white/10 bg-[#0f0f0f] text-zinc-500"
                    } ${inMonth ? "opacity-100" : "opacity-45"}`}
                  >
                    <span>{format(day, "d")}</span>
                    {isToday(day) && !selectedDayMatch ? (
                      <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-zinc-300" />
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111] p-4">
            <div className="mb-4 border-b border-white/10 pb-3 text-center">
              <p className="text-sm font-semibold text-white">{format(selectedDay, "EEEE")}</p>
              <p className="text-xs text-zinc-400">{format(selectedDay, "MMMM d, yyyy")}</p>
            </div>

            <div className="space-y-2">
              {selectedDaySlots.length === 0 ? (
                <div className="py-6 text-center text-sm text-zinc-500">No slots available</div>
              ) : (
                selectedDaySlots.map((record) => {
                  const isSelected = (record.Id ?? record.id) === (selected?.Id ?? selected?.id)

                  if (!record.is_available) {
                    return (
                      <div
                        key={String(record.Id ?? record.id ?? `${record.date}-${record.start_time}`)}
                        className="w-full rounded-md border border-white/10 border-l-4 border-l-zinc-500 bg-[#1a1a1a] px-3 py-2"
                      >
                        <p className="whitespace-nowrap text-[13px] text-zinc-400">
                          {formatTime12h(record.start_time)} - {formatTime12h(record.end_time)}
                        </p>
                        <p className="mt-1 text-[13px] font-semibold text-zinc-500">Full</p>
                      </div>
                    )
                  }

                  return (
                    <div
                      key={String(record.Id ?? record.id ?? `${record.date}-${record.start_time}`)}
                      className={`w-full rounded-md border border-zinc-300 border-l-4 border-l-emerald-500 bg-zinc-100 px-3 py-2 ${
                        isSelected ? "ring-1 ring-[#DC2626]" : ""
                      }`}
                    >
                      <p className="whitespace-nowrap text-[13px] text-zinc-900">
                        {formatTime12h(record.start_time)} - {formatTime12h(record.end_time)}
                      </p>
                      <Button
                        size="sm"
                        className="mt-2 h-8 w-full bg-[#DC2626] text-[13px] font-semibold text-white hover:bg-[#B91C1C]"
                        onClick={() => {
                          setSelected(record)
                          setError(null)
                        }}
                      >
                        Book
                      </Button>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div className="rounded-xl border border-white/10 bg-[#111] p-4">
          <h4 className="mb-1 text-lg font-bold text-white">Book Session</h4>
          <p className="mb-4 text-sm text-zinc-400">
            {format(parseISO(selected.date), 'EEEE, MMM d, yyyy')} at {formatTime12h(selected.start_time)} - {formatTime12h(selected.end_time)}
          </p>

          {error && (
            <div className="mb-3 rounded-md border border-destructive/30 bg-destructive/10 p-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={submitBooking} className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="parent_name" className="text-white">Parent Name</Label>
                <Input
                  id="parent_name"
                  value={formData.parent_name}
                  onChange={(e) => onFieldChange('parent_name', e.target.value)}
                  className="border-white/15 bg-[#0f0f0f] text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="player_name" className="text-white">Player Name</Label>
                <Input
                  id="player_name"
                  value={formData.player_name}
                  onChange={(e) => onFieldChange('player_name', e.target.value)}
                  className="border-white/15 bg-[#0f0f0f] text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="parent_email" className="text-white">Parent Email</Label>
                <Input
                  id="parent_email"
                  type="email"
                  value={formData.parent_email}
                  onChange={(e) => onFieldChange('parent_email', e.target.value)}
                  className="border-white/15 bg-[#0f0f0f] text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="parent_phone" className="text-white">Parent Phone</Label>
                <Input
                  id="parent_phone"
                  value={formData.parent_phone}
                  onChange={(e) => onFieldChange('parent_phone', e.target.value)}
                  className="border-white/15 bg-[#0f0f0f] text-white"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={submitting} className="bg-[#DC2626] text-white hover:bg-[#B91C1C]">
                {submitting ? 'Submitting...' : 'Confirm Booking'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-white/15 bg-[#0f0f0f] text-white hover:bg-white/10"
                onClick={() => {
                  setSelected(null)
                  setError(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}