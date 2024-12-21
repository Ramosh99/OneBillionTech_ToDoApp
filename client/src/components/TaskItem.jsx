import { useState } from "react";
import {  ListItem,  ListItemText,  IconButton,  Checkbox,  TextField,  Box,  Typography,} from "@mui/material";
import {  Delete,  Edit,  Save,  Cancel,  RadioButtonUnchecked, CheckCircleRounded,} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, isToday } from "date-fns";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.name);
  const [editDate, setEditDate] = useState(new Date(task.scheduledFor));

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task._id, {
        name: editText.trim(),
        scheduledFor: editDate,
      });
      setEditing(false);
    }
  };

  const handleDateChange = (newDate) => {
    setEditDate(newDate);
  };
  const handleDelete = () => {
    onDelete(task._id, { isRemoved: true });
  };

  const handleStatusChange = () => {
    const newStatus = task.status === "active" ? "completed" : "active";
    onUpdate(task._id, { status: newStatus });
  };
  const isTaskToday = isToday(new Date(task.scheduledFor));
  return (
    <ListItem
      sx={{
        borderRadius: 1,
        my: 0.5,
      }}
      secondaryAction={
        editing ? (
          <>
            <IconButton onClick={handleSave} sx={{ top: -25, left: 5 }}>
              <Save />
            </IconButton>
            <IconButton
              onClick={() => {
                setEditText(task.name);
                setEditDate(new Date(task.scheduledFor));
                setEditing(false);
              }}
            >
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
        checked={task.status === "completed"}
        onChange={handleStatusChange}
        icon={<RadioButtonUnchecked />}
        checkedIcon={<CheckCircleRounded />}
      />

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {editing ? (
          <>
            <TextField
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSave()}
              fullWidth
              autoFocus
              sx={{ mb: 1 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={editDate}
                onChange={handleDateChange}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          </>
        ) : (
          <>
            <ListItemText
              primary={task.name}
              sx={{
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
              }}
            />
            <Typography
              sx={{
                color: isTaskToday
                  ? "rgba(255, 44, 16, 0.67)"
                  : "text.secondary",
              }}
              variant="caption"
              color="text.secondary"
            >
              {format(new Date(task.scheduledFor), "MMM dd, yyyy HH:mm")}
            </Typography>
          </>
        )}
      </Box>
    </ListItem>
  );
};

export default TaskItem;
