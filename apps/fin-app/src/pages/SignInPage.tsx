import { Typography } from '@mui/material';
import Boxed from "@carrot/theme/src/shared/Boxed.tsx";

export default function SignInPage() {

  return (
    <Boxed>
      <Typography variant='h4' gutterBottom>
        SignIn
      </Typography>
      <Typography variant='body1' align='center' sx={{ mb: 4 }}>
        Sign In
      </Typography>
    </Boxed>
  );
};
