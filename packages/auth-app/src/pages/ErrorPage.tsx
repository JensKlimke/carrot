import React from 'react';
import { alpha, Box, Container, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router';
import {useTranslation} from "react-i18next";

export default function ErrorPage() {

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: 1,
            p: 4,
            border: '1px solid',
            borderColor: alpha(theme.palette.grey[400], 0.4),
            boxShadow: theme.shadows[4],
          }}
        >
          <Typography variant='h4' gutterBottom>
            { t('auth.labels.error_page_title') }
          </Typography>
          <Typography variant='body1' align='center' sx={{ mb: 4 }}>
            { t('auth.labels.error_page_404_text') }
          </Typography>
          <NavLink to='/'>
            { t('auth.labels.error_page_back_link_text') }
          </NavLink>
        </Box>
      </Container>
    </Box>
  );
};
