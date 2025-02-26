import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router';
import {useTranslation} from "react-i18next";
import Boxed from "./Boxed";

export default function ErrorPage() {

  const { t } = useTranslation();

  return (
    <Boxed>
      <Typography variant='h4' gutterBottom>
        { t('auth.labels.error_page_title') }
      </Typography>
      <Typography variant='body1' align='center' sx={{ mb: 4 }}>
        { t('auth.labels.error_page_404_text') }
      </Typography>
      <NavLink to='/'>
        { t('auth.labels.error_page_back_link_text') }
      </NavLink>
    </Boxed>
  );
};
