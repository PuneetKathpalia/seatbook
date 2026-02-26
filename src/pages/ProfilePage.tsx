import { useSeat } from '../context/SeatContext.tsx'

export function ProfilePage() {
  const { currentEmployee, isCurrentUserWorkingDay } = useSeat()

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">My Profile</h2>
        <p className="mt-2 text-sm text-slate-600">
          Current employee details from seat-booking context.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Employee ID</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{currentEmployee.id}</p>
            <p className="mt-2 text-sm text-slate-500">Name</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{currentEmployee.name}</p>
            <p className="mt-2 text-sm text-slate-500">Batch</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{currentEmployee.batch}</p>
            <p className="mt-2 text-sm text-slate-500">Designated Seat</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{currentEmployee.designatedSeat}</p>
            <p className="mt-2 text-sm text-slate-500">Status Today</p>
            <p className="mt-1 text-base font-semibold text-slate-900">
              {isCurrentUserWorkingDay ? 'Working day' : 'Non-working day'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
