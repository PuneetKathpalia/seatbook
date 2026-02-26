import { createContext } from 'react'
export type Batch = 'Batch 1' | 'Batch 2'

export type SessionUser = {
  userId: string
  batch: Batch
}

export type ActivityAction = 'AUTO_OCCUPIED' | 'RELEASED' | 'EXTRA_BOOKED'

export type ActivityLogEntry = {
  id: string
  userId: string
  batch: Batch
  action: ActivityAction
  date: string
  time: string
}

export type DaySnapshot = {
  dateKey: string
  dateLabel: string
  weekNumber: number
  workingBatch: Batch | null
  seatsOccupied: number
  floatingSeatsAvailable: number
  extraBookings: number
}

export type SeatContextValue = {
  totalSeats: number
  batchSize: number
  designatedSeatsInUse: number
  floatingSeats: number
  releasedSeats: string[]
  floatingBookings: string[]
  activityLog: ActivityLogEntry[]
  availableFloatingSeats: number
  currentTime: Date
  isAuthenticated: boolean
  sessionUser: SessionUser | null
  isAfter3PM: boolean
  isWeekend: boolean
  todayWeekNumber: number
  todayWorkingBatch: Batch | null
  isTeamDay: boolean
  calendarDays: DaySnapshot[]
  login: (username: string, password: string) => boolean
  logout: () => void
  canReleaseDesignatedSeat: (targetDateKey: string) => boolean
  canBookFloatingSeat: (targetDateKey: string) => boolean
  getReleaseSeatDisabledReason: (targetDateKey: string) => string
  getBookSeatDisabledReason: (targetDateKey: string) => string
  releaseDesignatedSeat: (targetDateKey: string) => boolean
  bookFloatingSeat: (targetDateKey: string) => boolean
  getDaySnapshot: (targetDateKey: string) => DaySnapshot
}

export const SeatContext = createContext<SeatContextValue | undefined>(undefined)
