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
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-base font-semibold text-slate-900 sm:text-lg">Seat Booking System</h1>
          <button
            type="button"
            onClick={() => setIsSidebarOpen((previousValue) => !previousValue)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isSidebarOpen}
          >
            Menu
          </button>
        </div>
      </header>

      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
        />
      ) : null}

      <div className="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-7xl">
        <aside
          className={`fixed inset-y-14 left-0 z-30 w-72 border-r border-slate-200 bg-white transition-transform md:static md:inset-y-0 md:w-64 md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="border-b border-slate-100 px-6 py-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Navigation</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">Admin Panel</h2>
          </div>

          <nav className="px-3 pb-6">
            <ul className="mt-3 flex flex-col gap-1.5">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
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

        <main className="w-full flex-1 p-4 sm:p-6 lg:p-8">
          <div className="rounded-2xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
