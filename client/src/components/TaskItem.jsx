import { useState } from 'react';
import { ListItem, ListItemText, IconButton, Checkbox, TextField } from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.name);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task._id, { name: editText.trim() });
      setEditing(false);
    }
  };
  const handleDelete = () => {
    onDelete(task._id,{isRemoved:true});
  };

  const handleStatusChange = () => {
    const newStatus = task.status === 'active' ? 'completed' : 'active';
    onUpdate(task._id, { status: newStatus });
  };

  return (
    <ListItem
      secondaryAction={
        editing ? (
          <>
            <IconButton onClick={handleSave}>
              <Save />
            </IconButton>
            <IconButton onClick={() => {
              setEditText(task.name);
              setEditing(false);
            }}>
              <Cancel />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete()}>
              <Delete />
            </IconButton>
          </>
        )
      }
    >
      <Checkbox
        checked={task.status === 'completed'}
        onChange={handleStatusChange}
      />
      {editing ? (
        <TextField
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          // onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          fullWidth
          autoFocus
        />
      ) : (
        <ListItemText 
          primary={task.name}
          sx={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}
        />
      )}
    </ListItem>
  );
};

export default TaskItem;