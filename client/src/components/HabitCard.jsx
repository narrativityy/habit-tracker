import { useHabits } from '../context/HabitContext'

export default function HabitCard({ habit }) {
  const { toggleCompletion, isCompletedOn, getStreak, deleteHabit } = useHabits()
  const today = new Date()
  const completed = isCompletedOn(habit._id, today)
  const streak = getStreak(habit._id)

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
      completed
        ? 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800'
        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
    }`}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleCompletion(habit._id, today)}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
            completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-500 hover:border-green-400'
          }`}
        >
          {completed && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div>
          <span className={`font-medium ${completed ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-200'}`}>
            {habit.name}
          </span>
          {habit.description && (
            <p className={`text-sm ${completed ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
              {habit.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {streak > 0 && (
          <span className="text-sm text-orange-500 dark:text-orange-400 font-medium">
            {streak} day{streak !== 1 ? 's' : ''}
          </span>
        )}
        <button
          onClick={() => deleteHabit(habit._id)}
          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
