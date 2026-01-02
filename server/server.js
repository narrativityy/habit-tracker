import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/habit-tracker'

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

// Habit Schema
const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  completions: [{ type: String }] // Array of date strings 'YYYY-MM-DD'
})

const Habit = mongoose.model('Habit', habitSchema)

// Routes

// Get all habits
app.get('/api/habits', async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 })
    res.json(habits)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create a habit
app.post('/api/habits', async (req, res) => {
  try {
    const habit = new Habit({
      name: req.body.name,
      description: req.body.description || ''
    })
    await habit.save()
    res.status(201).json(habit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Update a habit
app.put('/api/habits/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, description: req.body.description },
      { new: true }
    )
    if (!habit) return res.status(404).json({ error: 'Habit not found' })
    res.json(habit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Delete a habit
app.delete('/api/habits/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id)
    if (!habit) return res.status(404).json({ error: 'Habit not found' })
    res.json({ message: 'Habit deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Toggle completion for a date
app.post('/api/habits/:id/toggle', async (req, res) => {
  try {
    const { date } = req.body // Expected format: 'YYYY-MM-DD'
    const habit = await Habit.findById(req.params.id)
    if (!habit) return res.status(404).json({ error: 'Habit not found' })

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
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
