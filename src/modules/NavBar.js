import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import { useNavigate, useLocation } from "react-router-dom";
import Tab from '@mui/material/Tab';
export default function NavBar() {
  let navigate = useNavigate();
  let location = useLocation();
  const handleChange = (event, newValue) => {
    navigate(`/${newValue}`);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs
          value={`${location.pathname}`.slice(1, location.pathname.length)}
          onChange={handleChange}
          aria-label="navigation tabs"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab
            label="Login"
            value={ 'login' }
          />
          <Tab
            label="Sign Up"
            value={ 'signup' }
          />
          <Tab
            label="Wizard"
            value={ 'wizard' }
          />
          <Tab
            label="Forgot Password"
            value={ 'forgotpassword' }
          />
          <Tab
            label="Landing Page"
            value={ '' }
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}