import Habit from '../models/Habit.js'

// @desc    Get all habits
// @route   GET /api/habits
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 })
    res.json(habits)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// @desc    Get single habit
// @route   GET /api/habits/:id
export const getHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id)
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' })
    }
    res.json(habit)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// @desc    Create a habit
// @route   POST /api/habits
export const createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      name: req.body.name,
      description: req.body.description || ''
    })
    res.status(201).json(habit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// @desc    Update a habit
// @route   PUT /api/habits/:id
export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description
      },
      { new: true, runValidators: true }
    )
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' })
    }
    res.json(habit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id)
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' })
    }
    res.json({ message: 'Habit deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// @desc    Toggle completion for a date
// @route   POST /api/habits/:id/toggle
export const toggleCompletion = async (req, res) => {
  try {
    const { date } = req.body  // Expected format: 'YYYY-MM-DD'

    if (!date) {
      return res.status(400).json({ error: 'Date is required' })
    }

    const habit = await Habit.findById(req.params.id)
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' })
    }

    const dateIndex = habit.completions.indexOf(date)
    if (dateIndex > -1) {
      habit.completions.splice(dateIndex, 1)
    } else {
      habit.completions.push(date)
    }

    await habit.save()
    res.json(habit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
