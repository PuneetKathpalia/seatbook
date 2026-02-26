import { useSeat } from "../../context/SeatContext";

export default function UserSwitcher() {
  const { users, currentEmployee, switchCurrentUser } = useSeat();

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-700">Simulate login as demo user</p>
      <div className="flex flex-wrap gap-2">
        {users.map((user) => {
          const isActive = user.id === currentEmployee.id;

          return (
            <button
              key={user.id}
              type="button"
              onClick={() => switchCurrentUser(user.id)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {user.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}