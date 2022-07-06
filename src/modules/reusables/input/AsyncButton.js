import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function AsyncButton({ isLoading, isError, isSuccess, children, ...props }) {
  const content = useMemo(() => {
    if(isLoading) {
        return (
            <CircularProgress
                size={ 18 }
                color={ 'inherit' }
                sx={{ m: 1 }}
            />
        );
    } else {
        return children;
    }
}, [isLoading, children]);
  return (
    <Button
    { ...props }
      disabled={ isLoading }
      sx={{ cursor: isLoading ? 'wait' : 'pointer', ...props?.sx }}
>
    { content }
</Button>
  )
}