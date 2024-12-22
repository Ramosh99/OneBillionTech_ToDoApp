import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isBefore, startOfDay } from 'date-fns';

const AddTask = ({ onAdd }) => {
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  const [dateError, setDateError] = useState(false);
  const [taskData, setTaskData] = useState({
    name: '',
    status: 'active',
    user: '',
    isRemoved: false,
    createdAt: new Date().toISOString(),
    scheduledFor: null
  });

  const isFormValid = () => {
    if (!taskData.name.trim() || !taskData.scheduledFor) return false;
    return !isBefore(taskData.scheduledFor, startOfDay(new Date()));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
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
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      onAdd({ taskData });
      setTaskData(prev => ({
        ...prev,
        name: '',
        scheduledFor: null
      }));
      setDateError(false);
    }
  };

  const handleChange = (e) => {
    setTaskData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleDateChange = (newDate) => {
    const isValidDate = !isBefore(newDate, startOfDay(new Date()));
    setDateError(!isValidDate);
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
            // error={taskData.name.trim().length === 0}
            // helperText={taskData.name.trim().length === 0 ? "Task name is required" : ""}
          />
          <DatePicker
            value={taskData.scheduledFor}
            // helperText={dateError ? "Please select a future date" : ""}
            onChange={handleDateChange}
            minDate={new Date()}
            slotProps={{ 
              textField: { 
                error: dateError,
                helperText: dateError ? "Please select a future date" : "",
                sx: { width: 250 }
              } 
            }}
          />
        </Box>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={!isFormValid() || !decodedToken}
        >
          Add Task
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default AddTask;
