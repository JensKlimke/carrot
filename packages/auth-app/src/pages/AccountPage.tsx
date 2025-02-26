import React from 'react';
import {Account} from '@toolpad/core';
import Box from '@mui/material/Box';
import {withTranslation} from 'react-i18next';
import {TFunction} from 'i18next';

function AccountPage({t} : {t : TFunction}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Account
        localeText={{
          signInLabel : t('auth.signInLabel'),
          signOutLabel : t('auth.signOutLabel'),
        }}
      />
    </Box>
  )
}

export default withTranslation()(AccountPage);