import TaskService from '../services/TaskService.js'

export const TaskController = {
    addTask: async (req, res) => {
        try {
            const task = await TaskService.createTask(req.body.taskData)
            res.status(201).json({
                status: 'Success',
                data: { task }
            })
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message
            })
        }
    },

    getTasks: async (req, res) => {
        try {
            const tasks = await TaskService.getTasksByUser(req.query.userId)
            res.status(200).json({
                status: 'Success',
                data: { task: tasks }
            })
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message
            })
        }
    },

    updateTask: async (req, res) => {
        try {
            const task = await TaskService.updateTask(req.params.id, req.body)
            res.status(200).json({
                status: 'Success',
                data: { task }
            })
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message
            })
        }
    },

    deleteTask: async (req, res) => {
        try {
            const task = await TaskService.deleteTask(req.params.id)
            res.status(200).json({
                status: 'Success',
                data: { task }
            })
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message
            })
        }
    }
}

export default TaskController
