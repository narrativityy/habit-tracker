import { createContext, useContext, useState } from 'react'

const HabitContext = createContext()

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState([])

  const addHabit = (name) => {
    const newHabit = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      completions: []
    }
    setHabits([...habits, newHabit])
  }

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id))
  }

  const toggleCompletion = (habitId, date) => {
    setHabits(habits.map(habit => {
      if (habit.id !== habitId) return habit

      const dateStr = date.toISOString().split('T')[0]
      const hasCompletion = habit.completions.includes(dateStr)

      return {
        ...habit,
        completions: hasCompletion
          ? habit.completions.filter(d => d !== dateStr)
          : [...habit.completions, dateStr]
      }
    }))
  }

  const isCompletedOn = (habitId, date) => {
    const habit = habits.find(h => h.id === habitId)
    if (!habit) return false
    const dateStr = date.toISOString().split('T')[0]
    return habit.completions.includes(dateStr)
  }

  const getStreak = (habitId) => {
    const habit = habits.find(h => h.id === habitId)
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
      addHabit,
      deleteHabit,
      toggleCompletion,
      isCompletedOn,
      getStreak
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
