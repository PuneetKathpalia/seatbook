import { useSeat } from "../context/SeatContext";
import { getCurrentUser } from "../context/UserStore";
import UserSwitcher from "../components/dashboard/UserSwitcher";
import WorkingCalendar from "../components/dashboard/WeeklyCalendar";

function getTodayWorkingBatch() {
  const day = new Date().getDay();
  return day >= 1 && day <= 3 ? "Batch 1" : "Batch 2";
}

export default function DashboardPage() {
  const { occupied, floating } = useSeat();
  const currentUser = getCurrentUser();
  const todayWorkingBatch = getTodayWorkingBatch();
  const isWorkingToday = currentUser.batch === todayWorkingBatch;

  return (
    <div className="space-y-4">
      <section className="rounded-xl bg-white p-4 shadow">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              Logged-in: {currentUser.batch}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isWorkingToday
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {isWorkingToday ? "Working today" : "Non-working today"}
            </span>
          </div>
        </div>
      </section>

      <UserSwitcher />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="p-4 bg-white rounded shadow">
          <p>Total Seats</p>
          <h2 className="text-2xl">50</h2>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p>Occupied</p>
          <h2 className="text-2xl">{occupied}</h2>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p>Floating</p>
          <h2 className="text-2xl">{floating}</h2>
        </div>
      </div>

      <WorkingCalendar currentBatch={currentUser.batch} />
    </div>
  );
}