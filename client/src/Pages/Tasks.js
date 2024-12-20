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
      const response = await axios.get(`http://localhost:8080/api/tasks/get-tasks`);
      setTasks(response.data.data.task);
      console.log(response.data.data.task)
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