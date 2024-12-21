import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

const AddTask = ({ onAdd }) => {
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  const [taskData, setTaskData] = useState({
    name: '',
    status: 'active',
    user: '',
    isRemoved: false,
    createdAt: new Date().toISOString(),
    scheduledFor: null
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
    console.log(taskData)
    e.preventDefault();
    if (!taskData.name.trim()) return;
    onAdd({ taskData });
    setTaskData(prev => ({
      ...prev,
      name: '',
      scheduledFor: null
    }));
  };

  const handleChange = (e) => {
    setTaskData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleDateChange = (newDate) => {
    setTaskData(prev => ({
      ...prev,
      scheduledFor: newDate
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            value={taskData.name}
            onChange={handleChange}
            placeholder="Add a new task"
          />
          <DateTimePicker
            value={taskData.scheduledFor}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            sx={{ width: 250 }}
          />
        </Box>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={!taskData.name.trim() || !decodedToken}
        >
          Add Task
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default AddTask;