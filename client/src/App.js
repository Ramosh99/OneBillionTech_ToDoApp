import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Container, Card, CardContent, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import EmailVerify from './Pages/EmailVerify.js';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/get-users');
        const result = await response.json();
        if (result.status === 'Success') {
          setUsers(result.data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Container className="App" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={
            <>
              <Typography variant="h3" gutterBottom>Users List</Typography>
              {users.map(user => (
                <Card key={user._id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography color="text.secondary">{user.email}</Typography>
                  </CardContent>
                </Card>
              ))}
            </>
          } />
          <Route path="/verify/:token" element={<EmailVerify />} />
          <Route path="/users" element={<Typography>Users Page</Typography>} />
          <Route path="/about" element={<Typography>About Page</Typography>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;