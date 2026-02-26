type Batch = "Batch 1" | "Batch 2";

type WeeklyCalendarProps = {
  currentBatch: Batch;
};

type DayItem = {
  key: string;
  label: string;
  shortLabel: string;
  dayIndex: number;
  workingBatch: Batch;
};

const WEEKDAYS: DayItem[] = [
  { key: "mon", label: "Monday", shortLabel: "Mon", dayIndex: 0, workingBatch: "Batch 1" },
  { key: "tue", label: "Tuesday", shortLabel: "Tue", dayIndex: 1, workingBatch: "Batch 1" },
  { key: "wed", label: "Wednesday", shortLabel: "Wed", dayIndex: 2, workingBatch: "Batch 1" },
  { key: "thu", label: "Thursday", shortLabel: "Thu", dayIndex: 3, workingBatch: "Batch 2" },
  { key: "fri", label: "Friday", shortLabel: "Fri", dayIndex: 4, workingBatch: "Batch 2" },
];

const getTodayWeekdayIndex = () => {
  const jsDay = new Date().getDay();
  return (jsDay + 6) % 7;
};

export default function WeeklyCalendar({ currentBatch }: WeeklyCalendarProps) {
  const todayIndex = getTodayWeekdayIndex();

  return (
    <section className="rounded-xl bg-white p-4 shadow">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Weekly Calendar</h3>
          <p className="text-sm text-slate-600">Monday to Friday schedule</p>
        </div>
        <p className="text-sm text-slate-700">
          Current batch: <span className="font-semibold text-slate-900">{currentBatch}</span>
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-2 text-slate-700">
          <span className="h-3 w-3 rounded-full bg-blue-500" /> Blue = Batch 1
        </span>
        <span className="inline-flex items-center gap-2 text-slate-700">
          <span className="h-3 w-3 rounded-full bg-emerald-500" /> Green = Batch 2
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {WEEKDAYS.map((day) => {
          const isToday = day.dayIndex === todayIndex;
          const isCurrentBatchDay = day.workingBatch === currentBatch;
          const isBatchOne = day.workingBatch === "Batch 1";

          return (
            <article
              key={day.key}
              className={`rounded-lg border p-3 transition ${
                isBatchOne
                  ? "border-blue-200 bg-blue-50"
                  : "border-emerald-200 bg-emerald-50"
              } ${isCurrentBatchDay ? "ring-2 ring-slate-900/20" : ""}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{day.shortLabel}</p>
                {isToday ? (
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-medium text-white">
                    Today
                  </span>
                ) : null}
              </div>

              <p className="mt-1 text-xs text-slate-600">{day.label}</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{day.workingBatch} working day</p>
              {isCurrentBatchDay ? (
                <p className="mt-1 text-xs text-slate-700">Matches your current batch</p>
              ) : (
                <p className="mt-1 text-xs text-slate-500">Other batch day</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}