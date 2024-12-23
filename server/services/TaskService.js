import Task from "../models/TaskModel.js";

export const TaskService = {
  createTask: async (taskData) => {
    const task = new Task(taskData);
    const savedTask = await task.save();
    return savedTask;
  },

  getTasksByUser: async (userId) => {
    if (!userId) {
      throw new Error("userId is required");
    }

    const tasks = await Task.find({
      user: userId,
      isRemoved: false,
    });
    return tasks;
  },

  updateTask: async (taskId, updates) => {
    const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    return task;
  },

  deleteTask: async (taskId) => {
    const task = await Task.findByIdAndDelete(taskId);
    return task;
  },
};

export default TaskService;
