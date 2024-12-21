import { ButtonGroup, Button } from '@mui/material';

const TaskFilter = ({ filter, onFilterChange }) => {
  return (
    <ButtonGroup variant="outlined" sx={{ mb: 3 }}>
      <Button 
        onClick={() => onFilterChange('all')}
        variant={filter === 'all' ? 'contained' : 'outlined'}
      >
        All
      </Button>
      <Button 
        onClick={() => onFilterChange('active')}
        variant={filter === 'active' ? 'contained' : 'outlined'}
      >
        Active
      </Button>
      <Button 
        onClick={() => onFilterChange('completed')}
        variant={filter === 'completed' ? 'contained' : 'outlined'}
      >
        Completed
      </Button>
    </ButtonGroup>
  );
};

export default TaskFilter;