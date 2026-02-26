export type SeatStatus = "available" | "booked" | "designated";

export interface Seat {
  seatNumber: string;
  batch: number;
  status: SeatStatus;
  bookedBy?: string;
}

export const SEATS: Seat[] = Array.from({ length: 50 }).map((_, i) => {
  const seatNo = i + 1;

  return {
    seatNumber: `F-${seatNo}`,
    batch: seatNo <= 40 ? 1 : 2,
    status: "available",
  };
});