import Task from '../models/TaskModel.js'
import redis from '../config/redis.js'

export const TaskService = {
    createTask: async (taskData) => {
        const task = new Task(taskData)
        const savedTask = await task.save()
        // Invalidate user's task cache when new task is created
        await redis.del(`tasks:${taskData.user}`)
        return savedTask
    },

    getTasksByUser: async (userId) => {
        if (!userId) {
            throw new Error('userId is required')
        }
    
        // Create cache key using the tasks data
        const tasks = await Task.find({
            user: userId,
            isRemoved: false
        })
    
        const cacheKey = `tasks:${JSON.stringify(tasks)}`
        const cachedTasks = await redis.get(cacheKey)
        
        if (cachedTasks) {
            return JSON.parse(cachedTasks)
        }
    
        // Store the tasks data in Redis
        await redis.setex(cacheKey, 3600, JSON.stringify(tasks))
        return tasks
    },
    

    updateTask: async (taskId, updates) => {
        const task = await Task.findByIdAndUpdate(taskId, updates, { new: true })
        // Invalidate cache after update
        await redis.del(`tasks:${task.user}`)
        return task
    },

    deleteTask: async (taskId) => {
        const task = await Task.findByIdAndDelete(taskId)
        // Invalidate cache after deletion
        await redis.del(`tasks:${task.user}`)
        return task
    }
}

export default TaskService
