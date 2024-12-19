import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import TaskFilter from '../components/TaskFilter';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, newTask);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, updates);
      setTasks(tasks.map(task => task._id === id ? { ...task, ...updates } : task));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
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