import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import TaskFilter from '../components/TaskFilter';
import axios from 'axios';
import { useCallback } from 'react';

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.id);
    } catch (error) {
      console.error('Invalid token:', error);
      navigate('/login');
    }
  }, [navigate]);

  const fetchTasks = useCallback(async () => {//useCallback is used to prevent infinite loop
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/tasks/get-tasks`, {
        params: { userId }
      });
      setTasks(response.data.data.task);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  const handleAddTask = async (newTask) => {
    console.log(newTask)
    try {
      const response = await axios.post(`http://localhost:8080/api/tasks/add-task`, newTask);
      console.log('response',response.data.data)
      console.log('tasks',tasks)
      setTasks([...tasks, response.data.data.task]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    console.log(id)
    console.log(updates)
    try {
      await axios.put(`http://localhost:8080/api/tasks/update-task/${id}`, updates);
      setTasks(tasks.map(task => task._id === id ? { ...task, ...updates } : task));
    } catch (err) {
      setError('Failed to update task');
      console.log(err)
    }
  };

  const handleDeleteTask = async (id,updates) => {
    try {
      console.log(id,updates)
      await axios.put(`http://localhost:8080/api/tasks/update-task/${id}`,updates);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 4 }}>Task Manager</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <AddTask onAdd={handleAddTask} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TaskList 
          tasks={tasks} 
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          filter={filter}
        />
      )}
    </Container>
  );
};

export default Tasks;