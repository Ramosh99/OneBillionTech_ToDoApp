import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
import Tasks from './Pages/Tasks.jsx';
import AboutMe from './Pages/AboutMe.jsx';
import ChangePassowrd from './Pages/ChangePassword.jsx';

function App() {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path='/dashboard' element={<Tasks />} />
            <Route path='/about-me' element={<AboutMe />} />
            <Route path='/change-password' element={<ChangePassowrd />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;