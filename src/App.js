import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeOptions from './theme';
import Login from './modules/authentication/Login';
import SignUp from './modules/authentication/Signup';
import NavBar from './modules/NavBar';
import LandingPage from './modules/misc/LandingPage';
import ForgotPassword from './modules/authentication/ForgotPassword';

function App() {
  const theme = createTheme(themeOptions)
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={ <LandingPage /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="signup" element={ <SignUp /> } />
          <Route path="forgot-password" element={ <ForgotPassword /> } />
        </Routes>
        </ BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
