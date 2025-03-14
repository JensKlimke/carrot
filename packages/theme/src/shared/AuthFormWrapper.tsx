import React from 'react';
import {Alert, AlertTitle, Box, Button, Typography} from '@mui/material';
import {FormEvent, ReactNode, useState} from "react";
import Boxed from "./Boxed";

export interface FormError {
  type ?: string
  message : string
}

interface AuthWrapperProps {
  children : ReactNode,
  logo : ReactNode | string,
  title : string,
  buttonText ?: string,
  callback : (data : FormData) => Promise<FormError | undefined>,
  footerText ?: string | ReactNode
}

function AuthFormWrapper(props : AuthWrapperProps) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FormError | undefined>(undefined);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Set loading
    setLoading(true);
    // Prevent default form submission
    event.preventDefault();
    // Get form data
    const data = new FormData(event.currentTarget);
    // Fire callback
    props.callback(data)
      .then((res) => setError(res))
      .finally(() => setLoading(false));
  }

  return (
    <Boxed>
      { props.logo }
      <Typography
        variant='h5'
        component='h1'
        color='textPrimary'
        sx={{
          textAlign: 'center',
          fontWeight: 600,
        }}
      >
        { props.title }
      </Typography>
      {
        error && (
          <Box sx={{ width: '100%'}}>
            <Alert
              severity='error'
            >
              { error.type && <AlertTitle>{error.type}</AlertTitle> }
              { error.message }
            </Alert>
          </Box>
        )
      }
      <Box component='form' onSubmit={handleSubmit} sx={{ width: '100%' }}>
        { props.children }
        <Button
          type='submit'
          fullWidth
          variant='contained'
          loading={loading}
          sx={{ mt: 2 }}
        >
          { props.buttonText || props.title }
        </Button>
      </Box>
      { props.footerText && (
        <Typography
          fontSize='small'
          sx={{
            textAlign: 'center',
            color: 'text.secondary'
          }}
        >
          { props.footerText }
        </Typography>
      ) }
    </Boxed>
  )

}


export default AuthFormWrapper;