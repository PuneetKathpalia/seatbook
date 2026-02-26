export type Batch = "Batch 1" | "Batch 2";

export type User = {
  id: "B1_U1" | "B1_U2" | "B2_U1" | "B2_U2";
  name: string;
  batch: Batch;
  designatedSeat: string;
  workingDays: number[];
};

export const DEMO_USERS: User[] = [
  {
    id: "B1_U1",
    name: "Batch1_User1",
    batch: "Batch 1",
    designatedSeat: "F-1",
    workingDays: [1, 2, 3],
  },
  {
    id: "B1_U2",
    name: "Batch1_User2",
    batch: "Batch 1",
    designatedSeat: "F-2",
    workingDays: [1, 2, 3],
  },
  {
    id: "B2_U1",
    name: "Batch2_User1",
    batch: "Batch 2",
    designatedSeat: "F-41",
    workingDays: [4, 5],
  },
  {
    id: "B2_U2",
    name: "Batch2_User2",
    batch: "Batch 2",
    designatedSeat: "F-42",
    workingDays: [4, 5],
  },
];

export const DEFAULT_USER_ID: User["id"] = "B1_U1";
const CURRENT_USER_ID_STORAGE_KEY = "seat-booking-system:current-user-id";

export const DEMO_USERS_BY_ID: Record<User["id"], User> = DEMO_USERS.reduce(
  (accumulator, user) => {
    accumulator[user.id] = user;
    return accumulator;
  },
  {} as Record<User["id"], User>,
);

export const getStoredUserId = (): User["id"] => {
  const storedValue = window.localStorage.getItem(CURRENT_USER_ID_STORAGE_KEY);

  if (!storedValue || !(storedValue in DEMO_USERS_BY_ID)) {
    return DEFAULT_USER_ID;
  }

  return storedValue as User["id"];
};

export const setStoredUserId = (userId: User["id"]) => {
  window.localStorage.setItem(CURRENT_USER_ID_STORAGE_KEY, userId);
};