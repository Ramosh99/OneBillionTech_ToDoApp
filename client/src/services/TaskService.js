import axios from 'axios';
import { API_URL_TASK } from '../config/config';


  export const TaskService = {
  getTasks: async (userId) => {
    const response = await axios.get(`${API_URL_TASK}/get-tasks`, {
      params: { userId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data.task;
  },
  addTask: async (taskData) => {

    const response = await axios.post(`${API_URL_TASK}/add-task`, taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data.task;
  },
  updateTask: async (taskId, updates) => {
    const response = await axios.put(`${API_URL_TASK}/update-task/${taskId}`, updates);
    return response.data.data;
  },
  deleteTask: async (taskId, updates) => {
    const response = await axios.put(`${API_URL_TASK}/update-task/${taskId}`, updates);
    return response.data;
  }
};

export default TaskService;
