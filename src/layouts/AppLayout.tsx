import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const navigationItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Book Seat', to: '/book-seat' },
  { label: 'My Profile', to: '/profile' },
  { label: 'All Bookings', to: '/bookings' },
]

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-900">Seat Booking System</h1>
          <button
            type="button"
            onClick={() => setIsSidebarOpen((previousValue) => !previousValue)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            aria-label="Toggle navigation"
            aria-expanded={isSidebarOpen}
          >
            Menu
          </button>
        </div>
      </div>

      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
        />
      ) : null}

      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white transition-transform md:static md:w-64 md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="px-6 py-6">
            <h1 className="text-xl font-semibold text-slate-900">Seat Booking System</h1>
          </div>

          <nav className="px-3 pb-6">
            <ul className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="w-full flex-1 p-4 pt-6 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
