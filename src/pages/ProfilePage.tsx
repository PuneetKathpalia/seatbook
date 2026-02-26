import { useState, type FormEvent } from 'react'
import { useSeat } from '../context/SeatContext.tsx'

export function ProfilePage() {
  const { sessionUser, isAuthenticated, login, logout } = useSeat()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const didLogin = login(username, password)
    if (!didLogin) {
      setIsError(true)
      setMessage('Invalid credentials. Use demo accounts listed below.')
      return
    }

    setIsError(false)
    setMessage('Login successful.')
    setPassword('')
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">My Profile</h2>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with demo users to run booking flows.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {isAuthenticated && sessionUser ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">User ID</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{sessionUser.userId}</p>
              <p className="mt-2 text-sm text-slate-500">Batch</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{sessionUser.batch}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-700">
              Username
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="batch1_user"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-700">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="1234"
              />
            </label>

            <div className="md:col-span-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-medium">Demo Users</p>
              <p className="mt-2">1) batch1_user / 1234 / Batch 1</p>
              <p>2) batch2_user / 1234 / Batch 2</p>
            </div>

            <div className="md:col-span-2 flex items-center justify-between">
              <span className="text-sm text-slate-500">Session is stored in localStorage.</span>
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Login
              </button>
            </div>

            {message ? (
              <p
                className={`md:col-span-2 rounded-lg px-3 py-2 text-sm ${
                  isError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {message}
              </p>
            ) : null}
          </form>
        )}
      </section>
    </div>
  )
}
