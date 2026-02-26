export type User = {
  id: string;
  name: string;
  batch: "Batch 1" | "Batch 2";
};

const USERS: Record<string, User> = {
  batch1: {
    id: "batch1",
    name: "Batch 1 User",
    batch: "Batch 1",
  },
  batch2: {
    id: "batch2",
    name: "Batch 2 User",
    batch: "Batch 2",
  },
};

export function getCurrentUser(): User {
  const stored = localStorage.getItem("currentUser");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("currentUser", JSON.stringify(USERS.batch1));
  return USERS.batch1;
}

export function switchUser(userKey: "batch1" | "batch2") {
  localStorage.setItem("currentUser", JSON.stringify(USERS[userKey]));
  window.location.reload();
}