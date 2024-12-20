import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddTask = ({ onAdd }) => {
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  const [taskData, setTaskData] = useState({
    name: '',
    status: 'active',
    user: '',
    isRemoved: false,
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setDecodedToken(decoded);
      setTaskData(prev => ({
        ...prev,
        user: decoded.id
      }));
    } catch (error) {
      console.error('Token decode error:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.name.trim()) return;
    onAdd({ taskData });
    setTaskData(prev => ({
      ...prev,
      name: ''
    }));
  };

  const handleChange = (e) => {
    setTaskData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', gap: 2 }}>
      <TextField
        fullWidth
        value={taskData.name}
        onChange={handleChange}
        placeholder="Add a new task"
        sx={{ mr: 1 }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={!taskData.name.trim() || !decodedToken}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default AddTask;