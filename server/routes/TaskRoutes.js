import express from 'express'
import { TaskController } from '../controllers/TaskController.js'

const router = express.Router()

router.post('/add-task', TaskController.addTask)
router.get('/get-tasks', TaskController.getTasks)
router.put('/update-task/:id', TaskController.updateTask)
router.delete('/delete-task/:id', TaskController.deleteTask)

export default router
