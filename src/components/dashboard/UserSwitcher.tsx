import { switchUser } from "../../context/UserStore";

export default function UserSwitcher() {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => switchUser("batch1")}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Login as Batch 1
      </button>
      <button
        onClick={() => switchUser("batch2")}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Login as Batch 2
      </button>
    </div>
  );
}