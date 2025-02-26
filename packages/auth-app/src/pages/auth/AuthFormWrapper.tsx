import React from 'react';
import {Alert, AlertTitle, alpha, Box, Button, Container, Typography, useTheme} from '@mui/material';
import {useTranslation} from "react-i18next";
import {branding} from "../../config/themes";

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
    <Container maxWidth={'xs'}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: 1,
            mt: 8,
            p: 4,
            border: '1px solid',
            borderColor: alpha(theme.palette.grey[400], 0.4),
            boxShadow: theme.shadows[4],
          }}
        >
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
        </Box>
      </Box>
    </Container>
  )

}


export default AuthFormWrapper;