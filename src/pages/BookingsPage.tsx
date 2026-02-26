import { useSeat } from "../context/SeatContext";

export default function BookingsPage() {
  const { logs } = useSeat();

  return (
    <div className="space-y-4">
      <section className="rounded-xl bg-white p-4 shadow">
        <h1 className="text-xl font-semibold text-slate-900">Activity Log</h1>
        <p className="mt-1 text-sm text-slate-600">
          Track recent seat booking and leaving activity across users.
        </p>
      </section>

      {logs.length === 0 ? (
        <section className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center shadow">
          <div>
            <p className="text-base font-medium text-slate-800">No activity yet</p>
            <p className="mt-1 text-sm text-slate-500">
              Booking and leave actions will appear here once users start using seats.
            </p>
          </div>
        </section>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full min-w-[640px] border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Batch</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Action</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => {
                const isBookedAction = l.action.toLowerCase().includes("book");

                return (
                  <tr key={i} className="border-t border-slate-100 transition hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-800">{l.user}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{l.batch}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          isBookedAction
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isBookedAction ? "Booked" : "Left"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{l.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}