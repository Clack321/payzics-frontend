import React, { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DesktopDatePicker';
import PhoneNumberInput from '../reusables/input/PhoneNumberInput';
import PasswordInput from '../reusables/input/PasswordInput';
import AsyncButton from '../reusables/input/AsyncButton';
import isEmail from '../../utils/string/validators/isEmail';
import routes from "../../routes";
export default function SignUp() {
  const { useCreateUserMutation, useCreatePhoneNumberMutation } = routes;
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ secondPassword, setSecondPassword ] = useState('');
  const [ firstNameError, setFirstNameError ] = useState('');
  const [ lastNameError, setLastNameError ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ birthDay, setBirthDay ] = useState(new Date());
  const [ birthDayError, setBirthDayError ]= useState('');
  const [ phoneNumberError, setPhoneNumberError] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ secondPasswordError, setSecondPasswordError ] = useState('');

  const navigate = useNavigate();

  const handleFirstNameChange = useCallback((value) => {
    if (firstNameError) {
      setFirstNameError('')
    }
    setFirstName(value);
  }, [firstNameError]);

  const handleLastNameChange = useCallback((value) => {
    if (lastNameError) {
      setLastNameError('')
    }
    setLastName(value);
  }, [lastNameError]);

  const handleBirthDayChange = useCallback((value) => {
    if (birthDayError) {
      setBirthDayError('')
    }
    setBirthDay(value);
  }, [birthDayError]);

  const handleEmailChange = useCallback((value) => {
    if (emailError) {
      setEmailError('')
    }
    setEmail(value);
  }, [emailError]);

  const handlePhoneNumberChange = useCallback((value) => {
    if (phoneNumberError) {
      setPhoneNumberError('')
    }
    setPhoneNumber(value);
  }, [phoneNumberError]);

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
    createUser,
    { isLoading } // This is the destructured mutation result
  ] = useCreateUserMutation()

  const [
    createPhoneNumber,
    phoneNumberObj
  ] = useCreatePhoneNumberMutation()

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    let isError = false;
    if (!firstName) {
      isError = true;
      setFirstNameError('Please provide your first name');
    }

    if (!lastName) {
      isError = true;
      setLastNameError('Please provide your last name');
    }

    if (!isEmail(email)) {
      isError = true;
      setEmailError('Please provide a valid email');
    }

    if (password.length < 7) {
      isError = true;
      setPasswordError('Password must be of atleast length 8');
    }

    if (password !== secondPassword) {
      isError = true;
      setSecondPasswordError('Passwords must match');
    }

    // if (phoneNumber.length !== )

    if (!isError) {
      createPhoneNumber({
        raw_number: phoneNumber,
      }).then((createdPhoneNumber) => {
        return createUser({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          birth_day: birthDay,
          phoneNumbers: [createdPhoneNumber._id]
        })
      }).then((res) => {
        if (res?.error?.status === 409) {
          setEmailError('Email already in use. If it is your email, please log in.')
        } else if (res?.data?.email){
          navigate('/login')
        }
      })
    }
  }, [
    createUser,
    firstName,
    lastName,
    password,
    secondPassword,
    phoneNumber,
    birthDay,
    createPhoneNumber,
    email,
    navigate
  ]);

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <PhoneNumberInput
                  value={ phoneNumber }
                  onChange={handlePhoneNumberChange}
                  id="phoneNumber"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  id="firstName"
                  value= { firstName }
                  error={ firstNameError !== ''}
                  helperText={ firstNameError }
                  onChange={ (e) => {
                    handleFirstNameChange(e.target.value)
                  }}
                  label="First Name"
                  name="firstName"
                  autoComplete="fafirst-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  value= { lastName }
                  error={ lastNameError !== ''}
                  helperText={ lastNameError }
                  onChange={ (e) => {
                    handleLastNameChange(e.target.value)
                  }}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={ 6 }>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Birth Day"
                  inputFormat="MM/dd/yyyy"
                  value={birthDay}
                  onChange={handleBirthDayChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                </ LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={ 6 }>
                <TextField
                  required
                  fullWidth
                  value={ email }
                  error={ emailError !== ''}
                  helperText={ emailError }
                  onChange={ (e) => handleEmailChange(e.target.value)}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
              <PasswordInput 
                value={ password }
                errorText={ passwordError }
                onChange={ (value) => {
                  handlePasswordChange(value)
                }}
                label="Password *"
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
                label="Password Validation *"
                fullWidth
                />
              </Grid>
            </Grid>
            <AsyncButton
              fullWidth
              type={ 'submit' }
              variant="contained"
              isLoading={ isLoading || phoneNumberObj.isLoading }
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </AsyncButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}