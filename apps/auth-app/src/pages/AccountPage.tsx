import {Account} from '@toolpad/core';
import Box from '@mui/material/Box';
import {useTranslation} from "react-i18next";

export default function AccountPage() {

  const {t} = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Account
        localeText={{
          accountSignInLabel : t('auth.signInLabel'),
          accountSignOutLabel : t('auth.signOutLabel'),
        }}
      />
    </Box>
  )
}
