import { useContext } from 'react'
import { SeatContext } from './SeatContextStore.ts'

export function useSeat() {
  const context = useContext(SeatContext)

  if (!context) {
    throw new Error('useSeat must be used within a SeatProvider')
  }

  return context
}
