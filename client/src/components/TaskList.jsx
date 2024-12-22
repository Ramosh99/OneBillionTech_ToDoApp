import { List } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks = [], onUpdate, onDelete, filter }) => {
    console.log(tasks)
    const taskArray = Array.isArray(tasks) ? tasks : [];
    console.log(taskArray)
    const filteredTasks = taskArray
    .filter(task => {
      // First filter out removed tasks
      if (task.isRemoved) return false;
      
      // Then filter by status
      if (filter === 'completed') return task.status === 'completed';
      if (filter === 'active') return task.status === 'active';
      return true; // 'all' filter
    })
    .sort((a, b) => {
      // First sort by status (active first)
      if (a.status !== b.status) {
        return a.status === 'active' ? -1 : 1;
      }
      // Then sort by creation date (newest first)
      return new Date(b.scheduledFor) - new Date(a.scheduledFor);
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