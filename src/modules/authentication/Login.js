import React, { useState, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import AsyncButton from '../reusables/input/AsyncButton';
import TextField from '@mui/material/TextField';
import {
  useNavigate,
} from "react-router-dom";
import isEmail from '../../utils/string/validators/isEmail';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import PasswordInput from '../reusables/input/PasswordInput';
import { setCredentials } from '../../redux/slices/auth';
import routes from '../../routes';
import { Stack } from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  const { useAuthenticationMutation } = routes;
  const [authenticate, { isLoading }] = useAuthenticationMutation();
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    if (!isEmail(email)) {
      setEmailError('This is not a valid email');
    } else if (emailError) {
      setEmailError('');
    }

    if (password.length < 7) {
      setPasswordError('Password must be atleast 8 characters long');
    } else if (passwordError) {
      setPasswordError('');
    }
    if (password.length >= 7 && isEmail(email)) {
      authenticate({
        strategy: 'local',
        email,
        password,
      }).then((res) => {
        const { error, data } = res;
        if (error) {
          setEmailError('Email May be incorrect')
          setPasswordError('Password May be incorrect')
        } else {
            const { user, accessToken } = data;
            dispatch(setCredentials({ user, token: accessToken }));
            localStorage.setItem('token', data.accessToken)
            navigate("/dashboard")
        }
      })
    }
  }, [
    email,
    emailError,
    password,
    passwordError,
    authenticate,
    navigate,
    dispatch
  ]);

  const handleEmailChange = useCallback((value) => {
    if (emailError) {
      setEmailError('')
    }
    setEmail(value);
  }, [emailError]);

  const handlePasswordChange = useCallback((value) => {
    if (passwordError) {
      setPasswordError('')
    }
    setPassword(value);
  }, [passwordError]);


  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            Chekhub Connect Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              error={ emailError !== ''}
              helperText={emailError}
              fullWidth
              id="email"
              value={ email }
              onChange={ (event) => {
                handleEmailChange(event.target.value);
              }}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <PasswordInput 
              value={ password }
              errorText={ passwordError }
              onChange={ (value) => {
                handlePasswordChange(value)
              }}
              label="Password"
              fullWidth
            />
            <AsyncButton
              fullWidth
              type={ 'submit' }
              variant="contained"
              isLoading={ isLoading }
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </AsyncButton>
              <Stack spacing={ .5 } justifyContent={ 'center' } alignItems={ 'center' }>
              <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                <Link href="forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Stack>
          </Box>
        </Box>
      </Container>
  );
}
