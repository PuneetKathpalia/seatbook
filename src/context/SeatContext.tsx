import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "./UserStore";

type Log = {
  user: string;
  batch: string;
  action: string;
  time: string;
};

type SeatContextType = {
  occupied: number;
  floating: number;
  logs: Log[];
  bookSeat: () => void;
  leaveSeat: () => void;
};

const SeatContext = createContext<SeatContextType | null>(null);

export function SeatProvider({ children }: { children: React.ReactNode }) {
  const [occupied, setOccupied] = useState(40);
  const [floating, setFloating] = useState(10);
  const [logs, setLogs] = useState<Log[]>([]);

  const user = getCurrentUser();

  function addLog(action: string) {
    setLogs((prev) => [
      ...prev,
      {
        user: user.name,
        batch: user.batch,
        action,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  }

  function bookSeat() {
    if (floating <= 0) return;
    setFloating((f) => f - 1);
    setOccupied((o) => o + 1);
    addLog("Booked extra seat");
  }

  function leaveSeat() {
    setOccupied((o) => o - 1);
    setFloating((f) => f + 1);
    addLog("Left seat");
  }

  return (
    <SeatContext.Provider
      value={{ occupied, floating, logs, bookSeat, leaveSeat }}
    >
      {children}
    </SeatContext.Provider>
  );
}

export function useSeat() {
  const ctx = useContext(SeatContext);
  if (!ctx) throw new Error("useSeat must be used inside provider");
  return ctx;
}