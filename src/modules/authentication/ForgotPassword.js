import React, { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import PasswordInput from '../reusables/input/PasswordInput';
import AsyncButton from '../reusables/input/AsyncButton';
import { getUser } from '../../redux/selectors/auth';
import routes from "../../routes";
export default function ForgotPassword() {
  const { usePatchUserByIdMutation } = routes;
  const [ password, setPassword ] = useState('');
  const [ secondPassword, setSecondPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ secondPasswordError, setSecondPasswordError ] = useState('');

  const navigate = useNavigate();
  const user = useSelector(getUser);

  const handlePasswordChange = useCallback((value) => {
    if (passwordError) {
      setPasswordError('')
    }
    setPassword(value)
  }, [passwordError])

  const handleSecondPasswordChange = useCallback((value) => {
    if (secondPasswordError) {
      setSecondPasswordError('')
    }
    setSecondPassword(value)
  }, [secondPasswordError])

  const [
    updateUser,
    { isLoading } // This is the destructured mutation result
  ] = usePatchUserByIdMutation()
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    let isError = false;

    if (password.length < 7) {
      isError = true;
      setPasswordError('Password must be of atleast length 8');
    }

    if (password !== secondPassword) {
      isError = true;
      setSecondPasswordError('Passwords must match');
    }

    if (!isError) {
      updateUser({
        id: user._id,
        password,
      }).then((res) => {
        if (res?.data?.email){
          navigate('/login')
        } else {
          setPasswordError('Something went wrong. Please submit a support ticket')
        }
      })
    }
  }, [updateUser, password, secondPassword, navigate, user]);

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            Forgot Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <PasswordInput 
                value={ password }
                errorText={ passwordError }
                onChange={ (value) => {
                  handlePasswordChange(value)
                }}
                label="New Password"
                fullWidth
                />
              </Grid>
              <Grid item xs={12}>
              <PasswordInput 
                value={ secondPassword }
                errorText={ secondPasswordError }
                onChange={ (value) => {
                  handleSecondPasswordChange(value)
                }}
                label="Re-Enter New Password"
                fullWidth
                />
              </Grid>
            </Grid>
            <AsyncButton
              fullWidth
              type={ 'submit' }
              variant="contained"
              isLoading={ isLoading }
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </AsyncButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Login Instead
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}