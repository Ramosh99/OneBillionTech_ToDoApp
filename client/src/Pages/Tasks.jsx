import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import TaskFilter from '../components/TaskFilter';
import { useCallback } from 'react';
import TaskService from '../services/TaskService';
import AuthService from '../services/AuthService';

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // const token = localStorage.getItem('token');
    const token = AuthService.getToken();
    if (!token) {
      navigate('/');
      return;
    }
    
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.id);
    } catch (error) {
      console.error('Invalid token:', error);
      navigate('/');
    }
  }, [navigate]);

  const fetchTasks = useCallback(async () => {//useCallback is used to prevent infinite loop
    if (!userId) return;
    
    setLoading(true);
    try {
      const taskData = await TaskService.getTasks(userId);
      setTasks(taskData);
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
    try {
      const addedTask = await TaskService.addTask(newTask);
      setTasks([...tasks, addedTask]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      await TaskService.updateTask(id, updates);
      setTasks(tasks.map(task => task._id === id ? { ...task, ...updates } : task));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id, updates) => {
    try {
      await TaskService.deleteTask(id, updates);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 4 ,fontWeight:'bold'}}><span style={{ color: '#c42cff' }}>Task</span> Manager</Typography>
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