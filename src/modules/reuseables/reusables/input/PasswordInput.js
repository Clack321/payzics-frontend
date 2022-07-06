import React, { useState, useCallback, useMemo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

export default function PasswordInput({
  value,
  errorText='',
  onChange,
  label='Password',
  fullWidth=false,
}) {

  const helperText = useMemo(() => errorText !== '' && (
    <FormHelperText
      error
    >
      { errorText }
    </FormHelperText>
  ), [errorText]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const nonce = useMemo(() => {
    return Math.floor(Math.random() * 999999999)
  }, []);

  return (
    <>
    <InputLabel
      varient={ 'outlined' }
      htmlFor={ `password-${nonce}` }
    >
      { label }
    </InputLabel>
    <OutlinedInput
      id={ `password-${nonce}` }
      type={showPassword ? 'text' : 'password'}
      value={value}
      error={ errorText !== '' }
      fullWidth={ fullWidth }
      onChange={e => onChange(e.target.value)}
      endAdornment={
        <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
      }
      label={ label }
    />
    { helperText }
    </>
  )
}