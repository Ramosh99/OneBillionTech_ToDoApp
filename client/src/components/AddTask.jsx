import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title });
    setTitle('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        sx={{ mr: 1 }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 1 }}
        disabled={!title.trim()}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default AddTask;