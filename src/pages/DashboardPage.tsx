import { useSeat } from "../context/SeatContext";
import UserSwitcher from "../components/dashboard/UserSwitcher";
import WorkingCalendar from "../components/dashboard/WeeklyCalendar";

export default function DashboardPage() {
  const {
    bookedSeatsCount,
    seatsLeftCount,
    presentUsersToday,
    leaveUsersToday,
    currentEmployee,
    isCurrentUserWorkingDay,
    workingBatch,
  } = useSeat();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">Overview of today's seat availability and work schedule.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Logged-in: {currentEmployee.batch}
            </span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              Working batch: {workingBatch ?? "None"}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isCurrentUserWorkingDay
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {isCurrentUserWorkingDay ? "Working day" : "Non-working day"}
            </span>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Present today: <span className="font-semibold text-slate-900">{presentUsersToday.length}</span>
          {" · "}
          On leave: <span className="font-semibold text-slate-900">{leaveUsersToday.length}</span>
        </p>
      </section>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <UserSwitcher />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Total Seats</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">50</h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Booked Seats</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">{bookedSeatsCount}</h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
          <p className="text-sm font-medium text-slate-600">Seats Left</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">{seatsLeftCount}</h2>
        </div>
      </div>

      <WorkingCalendar currentBatch={currentEmployee.batch} />
    </div>
  );
}