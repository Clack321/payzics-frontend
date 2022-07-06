import React from 'react';
import { isAuthenticated } from '../../../redux/selectors/auth';
import { useSelector } from 'react-redux';
import {
  Navigate,
} from 'react-router-dom';

function PrivateRoute({ path, children, ...rest }) {
  const isAuth = useSelector(isAuthenticated);
  if (isAuth || localStorage.getItem('token')) {
    return children
  } else if (!isAuth && localStorage.getItem('token')) {
    
  }
    return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;