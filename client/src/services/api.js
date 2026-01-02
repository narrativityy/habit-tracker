const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const habitApi = {
  // Get all habits
  async getAll() {
    const res = await fetch(`${API_URL}/habits`)
    if (!res.ok) throw new Error('Failed to fetch habits')
    return res.json()
  },

  // Create a new habit
  async create(name, description = '') {
    const res = await fetch(`${API_URL}/habits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    })
    if (!res.ok) throw new Error('Failed to create habit')
    return res.json()
  },

  // Update a habit
  async update(id, data) {
    const res = await fetch(`${API_URL}/habits/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to update habit')
    return res.json()
  },

  // Delete a habit
  async delete(id) {
    const res = await fetch(`${API_URL}/habits/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete habit')
    return res.json()
  },

  // Toggle completion for a date
  async toggleCompletion(id, date) {
    const res = await fetch(`${API_URL}/habits/${id}/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date })
    })
    if (!res.ok) throw new Error('Failed to toggle completion')
    return res.json()
  }
}
