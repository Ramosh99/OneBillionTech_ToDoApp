import Task from '../models/TaskModel.js'

export const TaskService = {
    createTask: async (taskData) => {
        const task = new Task(taskData)
        return await task.save()
    },

    getTasksByUser: async (userId) => {
        if (!userId) {
            throw new Error('userId is required')
        }
        return await Task.find({
            user: userId,
            isRemoved: false
        })
    },

    updateTask: async (taskId, updates) => {
        return await Task.findByIdAndUpdate(taskId, updates, { new: true })
    },

    deleteTask: async (taskId) => {
        return await Task.findByIdAndDelete(taskId)
    }
}

export default TaskService
