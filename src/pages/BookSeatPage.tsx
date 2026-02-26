import { useState } from "react";
import { getCurrentUser } from "../context/UserStore";
import { useSeat } from "../context/SeatContext";

export default function BookSeatPage() {
  const { occupied, floating, bookSeat, leaveSeat } = useSeat();
  const currentUser = getCurrentUser();
  const [helperText, setHelperText] = useState("Choose an action to update your booking.");

  const isBookDisabled = floating === 0;

  function handleBookSeat() {
    if (isBookDisabled) {
      setHelperText("No floating seats are available right now, so booking is disabled.");
      return;
    }

    bookSeat();
    setHelperText("Extra seat booked successfully. Occupied seats increased and floating seats decreased.");
  }

  function handleLeaveSeat() {
    const shouldLeave = window.confirm(
      "Are you sure you want to leave your seat? This will free one seat for others.",
    );

    if (!shouldLeave) {
      setHelperText("Leave seat action was canceled.");
      return;
    }

    leaveSeat();
    setHelperText("Seat released successfully. Occupied seats decreased and floating seats increased.");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Book Seat</h2>
        <p className="mt-1 text-sm text-slate-600">
          Logged in as <span className="font-medium text-slate-900">{currentUser.name}</span> ({currentUser.batch})
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Occupied Seats</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{occupied}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Floating Seats</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{floating}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <h3 className="text-lg font-semibold text-blue-900">Book Extra Seat</h3>
          <p className="mt-2 text-sm text-blue-900/90">
            Any logged-in user can book an extra seat when floating seats are available.
          </p>
          <p className="mt-1 text-sm text-blue-900/90">
            Booking is allowed only while floating seat count is greater than zero.
          </p>

          <button
            type="button"
            onClick={handleBookSeat}
            disabled={isBookDisabled}
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Book Extra Seat
          </button>

          <p className={`mt-2 text-sm ${isBookDisabled ? "text-red-700" : "text-blue-800"}`}>
            {isBookDisabled
              ? "Disabled: no floating seats are currently available."
              : "Enabled: floating seats are available for booking."}
          </p>
        </article>

        <article className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <h3 className="text-lg font-semibold text-orange-900">Leave Seat</h3>
          <p className="mt-2 text-sm text-orange-900/90">
            Releasing your seat makes one more seat available for others.
          </p>
          <p className="mt-1 text-sm text-orange-900/90">
            You will be asked to confirm before this action is applied.
          </p>

          <button
            type="button"
            onClick={handleLeaveSeat}
            className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Leave Seat
          </button>

          <p className="mt-2 text-sm text-orange-800">Warning: this action immediately updates seat counts.</p>
        </article>
      </section>

      <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
        {helperText}
      </p>
    </div>
  );
}