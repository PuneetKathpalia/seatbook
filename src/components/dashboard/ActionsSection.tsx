type ActionsSectionProps = {
  hasReleasedSeat: boolean
  isBookDisabled: boolean
  releaseHelperText: string
  bookHelperText: string
  statusMessage: string | null
  onReleaseSeat: () => void
  onBookSeat: () => void
}

export function ActionsSection({
  hasReleasedSeat,
  isBookDisabled,
  releaseHelperText,
  bookHelperText,
  statusMessage,
  onReleaseSeat,
  onBookSeat,
}: ActionsSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Actions</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <button
            type="button"
            onClick={onReleaseSeat}
            disabled={hasReleasedSeat}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Release My Designated Seat
          </button>
          <p className="mt-2 text-xs text-slate-500">{releaseHelperText}</p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <button
            type="button"
            onClick={onBookSeat}
            disabled={isBookDisabled}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Book Floating Seat
          </button>
          <p className="mt-2 text-xs text-slate-500">{bookHelperText}</p>
        </div>
      </div>

      {statusMessage ? (
        <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
          {statusMessage}
        </p>
      ) : null}
    </section>
  )
}
