import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

export const TaskService = {
  getTasks: async (userId) => {
    const response = await axios.get(`${API_URL}/get-tasks`, {
      params: { userId }
    });
    return response.data.data.task;
  },
  addTask: async (taskData) => {
    const response = await axios.post(`${API_URL}/add-task`, taskData);
    return response.data.data.task;
  },
  updateTask: async (taskId, updates) => {
    const response = await axios.put(`${API_URL}/update-task/${taskId}`, updates);
    return response.data.data;
  },
  deleteTask: async (taskId, updates) => {
    const response = await axios.put(`${API_URL}/update-task/${taskId}`, updates);
    return response.data;
  }
};

export default TaskService;