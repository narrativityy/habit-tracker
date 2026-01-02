import express from 'express'
import {
  getHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleCompletion
} from '../controllers/habitController.js'

const router = express.Router()

router.route('/')
  .get(getHabits)
  .post(createHabit)

router.route('/:id')
  .get(getHabit)
  .put(updateHabit)
  .delete(deleteHabit)

router.post('/:id/toggle', toggleCompletion)

export default router
