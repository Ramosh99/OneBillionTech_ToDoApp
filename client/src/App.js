// import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import { Container, Card, CardContent, Typography } from '@mui/material';
import Navbar from './components/Navbar.jsx';
// import EmailVerify from './Pages/EmailVerify.js';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
// import Dashboard from './components/Dashboard.js';
import Tasks from './Pages/Tasks.jsx';
import AboutMe from './Pages/AboutMe.jsx';
import ChangePassowrd from './Pages/ChangePassword.jsx';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/dashboard' element={<Tasks />} />
          <Route path='/about-me' element={<AboutMe />} />
          <Route path='/change-password' element={<ChangePassowrd />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;