import { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Avatar, Divider, Alert, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const AboutMe = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        my: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 }
      }}>
        <Typography 
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', sm: '2.125rem' },
            mb: { xs: 2, sm: 3 }
          }} 
          variant="h4" 
          align="center"
        >
          <span style={{ color: '#c42cff' }}>About </span>Me
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {userData && (
          <Paper elevation={3} sx={{ 
            p: { xs: 2, sm: 3 },
            borderRadius: { xs: 2, sm: 3 }
          }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              mb: 3,
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <Avatar sx={{ 
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                mb: isMobile ? 2 : 0,
                mr: isMobile ? 0 : 2,
                bgcolor: 'primary.main'
              }}>
                <PersonIcon fontSize={isMobile ? "medium" : "large"} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}>
                  {userData.userName}
                </Typography>
                <Typography 
                  color="textSecondary"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  {userData.email}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />

            <Box sx={{ 
              mt: 2,
              '& .MuiTypography-root': {
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }
            }}>
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
