import { useState, useEffect } from "react";
import { ListItem, ListItemText, IconButton, Checkbox, TextField, Box, Typography } from "@mui/material";
import { Delete, Edit, Save, Cancel, RadioButtonUnchecked, CheckCircleRounded } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, isToday, isBefore, startOfDay } from "date-fns";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.name);
  const [editDate, setEditDate] = useState(new Date(task.scheduledFor));
  const [dateError, setDateError] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (editing) {
      validateForm();
    }
  }, [editText, editDate, editing]);

  const validateForm = () => {
    const isDateValid = !isBefore(editDate, startOfDay(new Date()));
    const isTextValid = editText.trim().length > 0;
    setIsValid(isDateValid && isTextValid);
    setDateError(!isDateValid);
  };

  const handleSave = () => {
    if (isValid && editText.trim()) {
      onUpdate(task._id, {
        name: editText.trim(),
        scheduledFor: editDate,
      });
      setEditing(false);
    }
  };

  const handleDateChange = (newDate) => {
    const isValidDate = !isBefore(newDate, startOfDay(new Date()));
    setDateError(!isValidDate);
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
            <IconButton 
              onClick={handleSave} 
              sx={{ top: -25, left: 5 }}
              disabled={!isValid}
            >
              <Save />
            </IconButton>
            <IconButton
              onClick={() => {
                setEditText(task.name);
                setEditDate(new Date(task.scheduledFor));
                setEditing(false);
                setDateError(false);
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
              onKeyPress={(e) => e.key === "Enter" && isValid && handleSave()}
              fullWidth
              autoFocus
              sx={{ mb: 1 }}
              error={editText.trim().length === 0}
              helperText={editText.trim().length === 0 ? "Task name is required" : ""}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={editDate}
                onChange={handleDateChange}
                minDate={new Date()}
                slotProps={{ 
                  textField: { 
                    size: "small",
                    error: dateError,
                    helperText: dateError ? "Please select a future date" : ""
                  } 
                }}
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
