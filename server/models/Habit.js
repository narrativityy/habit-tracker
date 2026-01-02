import mongoose from 'mongoose'

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Habit name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    default: '',
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  completions: [{
    type: String  // Array of date strings 'YYYY-MM-DD'
  }]
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
})

export default mongoose.model('Habit', habitSchema)
