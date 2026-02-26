import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SEATS } from "../constants/seats";
import type { Seat } from "../constants/seats";
import {
  type Batch,
  DEMO_USERS,
  DEMO_USERS_BY_ID,
  type User,
  getStoredUserId,
  setStoredUserId,
} from "./UserStore";

type Employee = User & {
  isOnLeave: boolean;
};

type EmployeeStore = Record<User["id"], Employee>;
type SeatBookingMap = Partial<Record<string, User["id"]>>;

export interface SeatLog {
  user: string;
  batch: Batch;
  action: "Booked" | "Left";
  time: string;
}

interface SeatContextType {
  seats: Seat[];
  visibleSeats: Seat[];
  bookedSeats: Seat[];
  seatsLeft: Seat[];
  bookedSeatsCount: number;
  seatsLeftCount: number;
  presentUsersToday: Employee[];
  leaveUsersToday: Employee[];
  logs: SeatLog[];
  users: User[];
  currentEmployee: Employee;
  switchCurrentUser: (userId: User["id"]) => void;
  workingBatch: Batch | null;
  isCurrentUserWorkingDay: boolean;
  canJoinToday: boolean;
  canMarkLeave: boolean;
  bookSeat: (seatNumber: string, user: User) => boolean;
  markLeave: (seatNumber: string, user: User) => boolean;
}

const SeatContext = createContext<SeatContextType | null>(null);

const DEFAULT_OCCUPANT = "SYSTEM_DEFAULT";

const EMPLOYEES: EmployeeStore = DEMO_USERS.reduce((accumulator, user) => {
  accumulator[user.id] = {
    ...user,
    isOnLeave: false,
  };

  return accumulator;
}, {} as EmployeeStore);

const getWorkingBatchForToday = (): Batch | null => {
  const day = new Date().getDay();

  if (day >= 1 && day <= 3) {
    return "Batch 1";
  }

  if (day >= 4 && day <= 5) {
    return "Batch 2";
  }

  return null;
};

const getWorkingBatchForDate = (date: Date): Batch | null => {
  const day = date.getDay();

  if (day >= 1 && day <= 3) {
    return "Batch 1";
  }

  if (day >= 4 && day <= 5) {
    return "Batch 2";
  }

  return null;
};

const addDays = (date: Date, daysToAdd: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  return nextDate;
};

const getNextWorkingDayInfo = (fromDate: Date) => {
  let dayOffset = 1;

  while (dayOffset <= 7) {
    const candidateDate = addDays(fromDate, dayOffset);
    const candidateBatch = getWorkingBatchForDate(candidateDate);

    if (candidateBatch) {
      return {
        date: candidateDate,
        batch: candidateBatch,
      };
    }

    dayOffset += 1;
  }

  return null;
};

const BATCH_ONE_SEAT_COUNT = SEATS.filter((seat) => seat.batch === 1).length;
const BATCH_TWO_SEAT_COUNT = SEATS.filter((seat) => seat.batch === 2).length;
const DEFAULT_WORKING_ALLOCATION_COUNT = Math.max(BATCH_ONE_SEAT_COUNT, BATCH_TWO_SEAT_COUNT);

export const SeatProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUserId, setCurrentUserId] = useState<User["id"]>(() => getStoredUserId());
  const [employees, setEmployees] = useState<EmployeeStore>(EMPLOYEES);
  const [crossBatchBookings, setCrossBatchBookings] = useState<SeatBookingMap>({});
  const [logs, setLogs] = useState<SeatLog[]>([]);
  const now = new Date();
  const workingBatch = getWorkingBatchForToday();

  useEffect(() => {
    setStoredUserId(currentUserId);
  }, [currentUserId]);

  const currentEmployee = employees[currentUserId] ?? EMPLOYEES.B1_U1;

  const workingUsersToday = useMemo(() => {
    if (!workingBatch) {
      return [] as Employee[];
    }

    return Object.values(employees).filter((employee) => employee.batch === workingBatch);
  }, [employees, workingBatch]);

  const leaveUsersToday = useMemo(
    () => workingUsersToday.filter((employee) => employee.isOnLeave),
    [workingUsersToday],
  );

  const presentUsersToday = useMemo(
    () => workingUsersToday.filter((employee) => !employee.isOnLeave),
    [workingUsersToday],
  );

  const isCurrentUserWorkingDay = Boolean(
    workingBatch && currentEmployee.batch === workingBatch,
  );
  const isAfter3PM = now.getHours() > 15 || (now.getHours() === 15 && now.getMinutes() >= 0);
  const nextWorkingDayInfo = getNextWorkingDayInfo(now);
  const isOneDayBeforeWorkingDay = Boolean(nextWorkingDayInfo);
  const isNextWorkingDayOtherBatch = Boolean(
    nextWorkingDayInfo && nextWorkingDayInfo.batch !== currentEmployee.batch,
  );
  const canJoinToday = !isCurrentUserWorkingDay && isAfter3PM && isOneDayBeforeWorkingDay && isNextWorkingDayOtherBatch;
  const canMarkLeave = isCurrentUserWorkingDay && !currentEmployee.isOnLeave;

  const seats = useMemo(() => {
    const leaveSeatSet = new Set(
      leaveUsersToday.map((employee) => employee.designatedSeat),
    );

    const workingBatchSeats = SEATS.filter((seat) => {
      if (!workingBatch) {
        return false;
      }

      const seatBatch = seat.batch === 1 ? "Batch 1" : "Batch 2";
      return seatBatch === workingBatch;
    });

    const nonWorkingBatchSeats = SEATS.filter((seat) => {
      if (!workingBatch) {
        return false;
      }

      const seatBatch = seat.batch === 1 ? "Batch 1" : "Batch 2";
      return seatBatch !== workingBatch;
    });

    const defaultBookedSeatNumbers = new Set(
      [...workingBatchSeats, ...nonWorkingBatchSeats]
        .slice(0, DEFAULT_WORKING_ALLOCATION_COUNT)
        .map((seat) => seat.seatNumber),
    );

    return SEATS.map((seat) => {
      if (defaultBookedSeatNumbers.has(seat.seatNumber) && !leaveSeatSet.has(seat.seatNumber)) {
        return {
          ...seat,
          status: "booked" as const,
          bookedBy: DEFAULT_OCCUPANT,
        };
      }

      const bookingUserId = crossBatchBookings[seat.seatNumber];
      if (bookingUserId) {
        const bookingUser = DEMO_USERS_BY_ID[bookingUserId];

        return {
          ...seat,
          status: "booked" as const,
          bookedBy: bookingUser?.name,
        };
      }

      return {
        ...seat,
        status: "available" as const,
        bookedBy: undefined,
      };
    });
  }, [crossBatchBookings, leaveUsersToday, workingBatch]);

  const seatsLeft = useMemo(
    () => seats.filter((seat) => seat.status === "available"),
    [seats],
  );

  const bookedSeats = useMemo(
    () => seats.filter((seat) => seat.status === "booked"),
    [seats],
  );

  const bookedSeatsCount = bookedSeats.length;
  const seatsLeftCount = seatsLeft.length;

  const visibleSeats = useMemo(() => seats, [seats]);

  const switchCurrentUser = (userId: User["id"]) => {
    if (!(userId in DEMO_USERS_BY_ID)) {
      return;
    }

    setCurrentUserId(userId);
  };

  const bookSeat = (seatNumber: string, user: User): boolean => {
    if (
      user.id !== currentEmployee.id ||
      !workingBatch ||
      user.batch === workingBatch ||
      currentEmployee.isOnLeave ||
      !canJoinToday
    ) {
      return false;
    }

    const targetSeat = seats.find((seat) => seat.seatNumber === seatNumber);
    if (!targetSeat || targetSeat.status !== "available") {
      return false;
    }

    setCrossBatchBookings((prev) => ({
      ...prev,
      [seatNumber]: user.id,
    }));

    setLogs((prev) => [
      {
        user: user.name,
        batch: user.batch,
        action: "Booked",
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    return true;
  };

  const markLeave = (seatNumber: string, user: User): boolean => {
    if (
      user.id !== currentEmployee.id ||
      !isCurrentUserWorkingDay ||
      currentEmployee.isOnLeave ||
      seatNumber !== currentEmployee.designatedSeat
    ) {
      return false;
    }

    const designatedSeatNumber = seatNumber;
    const designatedSeat = SEATS.find((seat) => seat.seatNumber === designatedSeatNumber);
    if (!designatedSeat) {
      return false;
    }

    setEmployees((prev) => ({
      ...prev,
      [currentEmployee.id]: {
        ...prev[currentEmployee.id],
        isOnLeave: true,
      },
    }));

    setLogs((prev) => [
      {
        user: user.name,
        batch: user.batch,
        action: "Left",
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    return true;
  };

  return (
    <SeatContext.Provider
      value={{
        seats,
        visibleSeats,
        bookedSeats,
        seatsLeft,
        bookedSeatsCount,
        seatsLeftCount,
        presentUsersToday,
        leaveUsersToday,
        logs,
        users: DEMO_USERS,
        currentEmployee,
        switchCurrentUser,
        workingBatch,
        isCurrentUserWorkingDay,
        canJoinToday,
        canMarkLeave,
        bookSeat,
        markLeave,
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};

export const useSeat = () => {
  const ctx = useContext(SeatContext);
  if (!ctx) {
    throw new Error("useSeat must be used inside SeatProvider");
  }
  return ctx;
};