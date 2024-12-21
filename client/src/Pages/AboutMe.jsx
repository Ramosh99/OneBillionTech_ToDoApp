import { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Avatar, Divider, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const AboutMe = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUserData(decoded);
    } catch (error) {
      setError('Failed to load user data');
      navigate('/');
    }
  }, [navigate]);
  console.log(userData)

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          About Me
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {userData && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80, mr: 2, bgcolor: 'primary.main' }}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5">{userData.userName}</Typography>
                <Typography color="textSecondary">{userData.email}</Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Account Created:</strong> {new Date(userData.iat * 1000).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>User ID:</strong> {userData.id}
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default AboutMe;