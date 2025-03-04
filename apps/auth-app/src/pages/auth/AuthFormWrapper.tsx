import {Alert, AlertTitle, Box, Button, Typography, useTheme} from '@mui/material';
import {useTranslation} from "react-i18next";
import {FormEvent, ReactNode, useState} from "react";
import {FormError} from "../../config/FormError.ts";
import {branding} from "../../config/branding.tsx";
import Boxed from "@carrot/theme/src/Boxed.tsx";

interface AuthWrapperProps {
  children : ReactNode,
  title : string,
  buttonText ?: string,
  callback : (data : FormData) => Promise<FormError | undefined>,
}

function AuthFormWrapper(props : AuthWrapperProps) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FormError | undefined>(undefined);
  const theme = useTheme();
  const { t } = useTranslation();

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