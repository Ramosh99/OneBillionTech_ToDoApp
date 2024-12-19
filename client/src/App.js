// import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import { Container, Card, CardContent, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import EmailVerify from './Pages/EmailVerify.js';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login.js';
import ForgotPassword from './Pages/ForgotPassword.js';
import ResetPassword from './Pages/ResetPassword.js';
// import Dashboard from './components/Dashboard.js';
import Tasks from './Pages/Tasks.js';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      {/* <Container className="App" sx={{ mt: 4 }}> */}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify/:token" element={<EmailVerify />} />
          <Route path='/dashboard' element={<Tasks />} />
        </Routes>
      {/* </Container> */}
    </BrowserRouter>
  );
}

export default App;