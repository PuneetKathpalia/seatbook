type DashboardHeaderProps = {
  dateLabel: string
  timeLabel: string
  isBookingOpen: boolean
  statusLabel: string
}

export function DashboardHeader({
  dateLabel,
  timeLabel,
  isBookingOpen,
  statusLabel,
}: DashboardHeaderProps) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Seat Booking System
          </h1>
          <p className="mt-2 text-sm text-slate-600">{dateLabel}</p>
          <p className="text-sm text-slate-600">Current Time: {timeLabel}</p>
        </div>

        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            isBookingOpen
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {statusLabel}
        </span>
      </div>
    </header>
  )
}
