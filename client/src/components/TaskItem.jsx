import { useState } from 'react';
import { ListItem, ListItemText, IconButton, Checkbox, TextField } from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    onUpdate(task._id, { title: editText });
    setEditing(false);
  };

  return (
    <ListItem
      secondaryAction={
        editing ? (
          <>
            <IconButton onClick={handleSave}>
              <Save />
            </IconButton>
            <IconButton onClick={() => setEditing(false)}>
              <Cancel />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(task._id)}>
              <Delete />
            </IconButton>
          </>
        )
      }
    >
      <Checkbox
        checked={task.completed}
        onChange={() => onUpdate(task._id, { completed: !task.completed })}
      />
      {editing ? (
        <TextField
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          fullWidth
        />
      ) : (
        <ListItemText 
          primary={task.title}
          sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        />
      )}
    </ListItem>
  );
};

export default TaskItem;