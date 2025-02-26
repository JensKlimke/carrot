import React from 'react';
import {Alert, AlertTitle, alpha, Box, Button, Container, Typography, useTheme} from '@mui/material';
import {useTranslation} from "react-i18next";
import {branding} from "../../config/themes";
import Boxed from "../Boxed";

export interface Error {
  type ?: string
  message : string
}

interface AuthWrapperProps {
  children : React.ReactNode,
  title : string,
  buttonText ?: string,
  callback : (data : FormData) => Promise<Error | undefined>,
}

function AuthFormWrapper(props : AuthWrapperProps) {

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      {branding(t)?.logo}
      <Typography
        variant='h5'
        component='h1'
        color='textPrimary'
        sx={{
          my: theme.spacing(1),
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
    </Boxed>
  )

}


export default AuthFormWrapper;