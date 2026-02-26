import { useSeat } from "../context/SeatContext";
import type { Seat } from "../constants/seats";
import { useMemo, useState } from "react";

export default function BookSeatPage() {
  const {
    visibleSeats,
    seatsLeftCount,
    currentEmployee,
    isCurrentUserWorkingDay,
    canJoinToday,
    canMarkLeave,
    bookSeat,
    markLeave,
  } = useSeat();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [selectedSeatNumber, setSelectedSeatNumber] = useState<string | null>(null);

  const orderedVisibleSeats = useMemo(() => {
    const bookedSeatBlock = visibleSeats.filter((seat) => seat.status === "booked");
    const seatsLeftBlock = visibleSeats.filter((seat) => seat.status === "available");

    return [...bookedSeatBlock, ...seatsLeftBlock];
  }, [visibleSeats]);

  const handleBookSeat = (seatNumber: string) => {
    if (isCurrentUserWorkingDay) {
      setStatusMessage("Only non-working batch users can grab available seats.");
      return;
    }

    if (!canJoinToday) {
      setStatusMessage("Joining is locked. It opens after 3:00 PM, one day before the target working day.");
      return;
    }

    setSelectedSeatNumber(seatNumber);
    setStatusMessage(`Seat ${seatNumber} selected. Confirm to join.`);
  };

  const handleConfirmBookSeat = () => {
    if (!selectedSeatNumber) {
      return;
    }

    const didBook = bookSeat(selectedSeatNumber, currentEmployee);

    if (didBook) {
      setStatusMessage(`Seat ${selectedSeatNumber} booked successfully.`);
      setSelectedSeatNumber(null);
      return;
    }

    setStatusMessage("Seat booking is not allowed for your current status.");
  };

  const handleMarkLeave = () => {
    const didMarkLeave = markLeave(currentEmployee.designatedSeat, currentEmployee);

    if (didMarkLeave) {
      setStatusMessage("Leave marked successfully. Your designated seat is now available.");
      return;
    }

    setStatusMessage("You cannot mark leave at this time.");
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Book Seat</h1>
        <p className="mt-1 text-sm text-slate-600">Select any seat left (green) from the map below to join instantly.</p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Seats Left
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 font-medium text-rose-700">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Booked Seats
          </span>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Logged in as <span className="font-semibold text-slate-900">{currentEmployee.name}</span>
          </p>
          <p className="text-sm text-slate-600">
            Batch <span className="font-semibold text-slate-900">{currentEmployee.batch}</span>
          </p>
        </div>

        <p className="mb-4 text-sm text-slate-600">
          Seats left today: <span className="font-semibold text-slate-900">{seatsLeftCount}</span>
        </p>

        <p className="mb-4 text-sm text-slate-600">
          Total seats shown: <span className="font-semibold text-slate-900">{visibleSeats.length}</span>
        </p>

        {!isCurrentUserWorkingDay ? (
          <p className={`mb-4 rounded-lg px-3 py-2 text-sm ${
            canJoinToday
              ? "bg-emerald-50 text-emerald-800"
              : "bg-amber-50 text-amber-800"
          }`}>
            {canJoinToday
              ? "Joining window is open. You may book a seat."
              : "Note: Cross-batch joining opens after 3:00 PM, one day before the working day."}
          </p>
        ) : null}

        {isCurrentUserWorkingDay ? (
          <div className="mb-4">
            <button
              type="button"
              onClick={handleMarkLeave}
              disabled={!canMarkLeave}
              className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Mark Leave
            </button>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
          {orderedVisibleSeats.map((seat: Seat) => {
            const isBooked = seat.status === "booked";
            const isSelected = selectedSeatNumber === seat.seatNumber;
            const isSeatActionDisabled = isBooked || isCurrentUserWorkingDay || !canJoinToday;
            const bookedTooltip =
              seat.bookedBy === "SYSTEM_DEFAULT"
                ? "Occupied by working batch"
                : `Booked by ${seat.bookedBy ?? "another user"}`;

            return (
              <button
                key={seat.seatNumber}
                disabled={isSeatActionDisabled}
                className={`rounded-lg border px-2 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                  isBooked
                    ? "cursor-not-allowed border-rose-200 bg-rose-500 text-white"
                    : `border-emerald-200 bg-emerald-500 text-white ${
                      isCurrentUserWorkingDay || !canJoinToday
                          ? "cursor-not-allowed opacity-70"
                          : "hover:bg-emerald-600 active:scale-[0.98]"
                      }`
                }`}
                onClick={() => handleBookSeat(seat.seatNumber)}
                title={
                  isBooked
                    ? bookedTooltip
                    : isCurrentUserWorkingDay
                      ? "Available to non-working batch users"
                      : !canJoinToday
                        ? "Joining opens after 3:00 PM, one day before working day"
                        : "Click to select this seat"
                }
              >
                {seat.seatNumber}
                {isSelected ? (
                  <span className="mt-1 block text-[10px] font-medium text-emerald-100">
                    Selected
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {!isCurrentUserWorkingDay && selectedSeatNumber ? (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm text-emerald-800">
              Selected seat: <span className="font-semibold">{selectedSeatNumber}</span>
            </p>
            <button
              type="button"
              onClick={handleConfirmBookSeat}
              disabled={!canJoinToday}
              className="mt-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Join / Book this seat
            </button>
          </div>
        ) : null}

        {statusMessage ? (
          <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
            {statusMessage}
          </p>
        ) : null}
      </section>
    </div>
  );
}