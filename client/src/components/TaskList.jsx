import { List } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete, filter }) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <List>
      {filteredTasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

export default TaskList;