import { createContext, useContext, useState, useEffect } from 'react'
import { habitApi } from '../services/api'

const HabitContext = createContext()

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch habits on mount
  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      setLoading(true)
      const data = await habitApi.getAll()
      setHabits(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addHabit = async (name, description = '') => {
    try {
      const newHabit = await habitApi.create(name, description)
      setHabits([newHabit, ...habits])
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteHabit = async (id) => {
    try {
      await habitApi.delete(id)
      setHabits(habits.filter(h => h._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const toggleCompletion = async (habitId, date) => {
    try {
      const dateStr = date.toISOString().split('T')[0]
      const updatedHabit = await habitApi.toggleCompletion(habitId, dateStr)
      setHabits(habits.map(h => h._id === habitId ? updatedHabit : h))
    } catch (err) {
      setError(err.message)
    }
  }

  const isCompletedOn = (habitId, date) => {
    const habit = habits.find(h => h._id === habitId)
    if (!habit) return false
    const dateStr = date.toISOString().split('T')[0]
    return habit.completions.includes(dateStr)
  }

  const getStreak = (habitId) => {
    const habit = habits.find(h => h._id === habitId)
    if (!habit || habit.completions.length === 0) return 0

    const sortedDates = [...habit.completions].sort().reverse()
    const today = new Date().toISOString().split('T')[0]

    let streak = 0
    let checkDate = new Date()

    // If not completed today, start checking from yesterday
    if (!sortedDates.includes(today)) {
      checkDate.setDate(checkDate.getDate() - 1)
    }

    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0]
      if (sortedDates.includes(dateStr)) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }

  return (
    <HabitContext.Provider value={{
      habits,
      loading,
      error,
      addHabit,
      deleteHabit,
      toggleCompletion,
      isCompletedOn,
      getStreak,
      refetch: fetchHabits
    }}>
      {children}
    </HabitContext.Provider>
  )
}

export function useHabits() {
  const context = useContext(HabitContext)
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider')
  }
  return context
}
