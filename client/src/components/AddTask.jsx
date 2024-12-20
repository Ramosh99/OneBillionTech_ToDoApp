import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
// import { create } from '@mui/material/styles/createTransitions';

const AddTask = ({ onAdd }) => {
  const dataStore = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(dataStore.split('.')[1]));

  const [taskData, setTaskData] = useState({
    name: '',
    status: 'active',
    user: decodedToken.id,
    isRemoved: false,
    createdAt: new Date().toISOString()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.name.trim()) return;
    onAdd({ taskData });
    setTaskData({ ...taskData }); // Reset name after submit
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      name: e.target.value
    });
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
        disabled={!taskData.name.trim()}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default AddTask;