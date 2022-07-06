import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeOptions from './theme';
import Login from './modules/authentication/Login';
import SignUp from './modules/onboarding/Signup';
import NavBar from './modules/NavBar';
import LandingPage from './modules/LandingPage';
import Dashboard from './modules/dashboard/Dashboard';
import PrivateRoute from './modules/reusables/misc/PrivateRoute';
import AchForm from './modules/onboarding/AchForm';
import ForgotPassword from './modules/authentication/ForgotPassword';
import ServiceCompanySignup from './modules/serviceCompany/ServiceCompanySignup';
import OnboardingWizard from './modules/onboarding/OnboardingWizard';

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
          <Route path="service-company/signup" element={ <ServiceCompanySignup /> } />
          <Route path="wizard" element={ <OnboardingWizard /> } />
          <Route path="forgotpassword" element={
              <PrivateRoute>
                <ForgotPassword />
              </PrivateRoute>
            }
          />
          <Route path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="banking/upload"
            element={
              <PrivateRoute>
                <AchForm />
              </PrivateRoute>
            }
          />
        </Routes>
        </ BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
