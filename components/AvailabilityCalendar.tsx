"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { addDays, addWeeks, format, isSameDay, parseISO, startOfWeek, subWeeks } from "date-fns"
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

export function AvailabilityCalendar() {
  const [records, setRecords] = useState<AvailabilityRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
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

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  )

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
    <div className="space-y-5 rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" onClick={() => setWeekStart((prev) => subWeeks(prev, 1))}>
          Prev
        </Button>
        <p className="text-center text-sm font-semibold text-foreground sm:text-base">
          {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}
        </p>
        <Button variant="outline" onClick={() => setWeekStart((prev) => addWeeks(prev, 1))}>
          Next
        </Button>
      </div>

      {loading ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Loading availability...</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-7">
          {weekDays.map((day) => {
            const dayRecords = records.filter((record) => {
              try {
                return isSameDay(parseISO(record.date), day)
              } catch {
                return false
              }
            })

            return (
              <div key={day.toISOString()} className="rounded-xl border border-border p-3">
                <p className="mb-3 text-sm font-bold text-foreground">{format(day, "EEE MMM d")}</p>

                <div className="space-y-2">
                  {dayRecords.length === 0 ? (
                    <div className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">No slots</div>
                  ) : (
                    dayRecords.map((record) => {
                      const isSelected = (record.Id ?? record.id) === (selected?.Id ?? selected?.id)

                      if (!record.is_available) {
                        return (
                          <div
                            key={String(record.Id ?? record.id ?? `${record.date}-${record.start_time}`)}
                            className="rounded-md border border-border bg-muted px-2 py-2 text-xs text-muted-foreground"
                          >
                            <div>{formatTime12h(record.start_time)} - {formatTime12h(record.end_time)}</div>
                            <div className="mt-1 font-semibold">Full</div>
                          </div>
                        )
                      }

                      return (
                        <div
                          key={String(record.Id ?? record.id ?? `${record.date}-${record.start_time}`)}
                          className={`rounded-md border px-2 py-2 text-xs ${
                            isSelected
                              ? 'border-primary bg-primary/20 text-foreground'
                              : 'border-emerald-300 bg-emerald-100 text-emerald-950'
                          }`}
                        >
                          <div>{formatTime12h(record.start_time)} - {formatTime12h(record.end_time)}</div>
                          <Button
                            size="sm"
                            className="mt-2 h-7 w-full"
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
            )
          })}
        </div>
      )}

      {selected && (
        <div className="rounded-xl border border-border bg-background p-4">
          <h4 className="mb-1 text-lg font-bold text-foreground">Book Session</h4>
          <p className="mb-4 text-sm text-muted-foreground">
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
                <Label htmlFor="parent_name">Parent Name</Label>
                <Input
                  id="parent_name"
                  value={formData.parent_name}
                  onChange={(e) => onFieldChange('parent_name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="player_name">Player Name</Label>
                <Input
                  id="player_name"
                  value={formData.player_name}
                  onChange={(e) => onFieldChange('player_name', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="parent_email">Parent Email</Label>
                <Input
                  id="parent_email"
                  type="email"
                  value={formData.parent_email}
                  onChange={(e) => onFieldChange('parent_email', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="parent_phone">Parent Phone</Label>
                <Input
                  id="parent_phone"
                  value={formData.parent_phone}
                  onChange={(e) => onFieldChange('parent_phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Confirm Booking'}
              </Button>
              <Button
                type="button"
                variant="outline"
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