import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout.tsx'
import BookingsPage from './pages/BookingsPage.tsx'
import BookSeatPage from './pages/BookSeatPage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import { ProfilePage } from './pages/ProfilePage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="book-seat" element={<BookSeatPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="bookings" element={<BookingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
