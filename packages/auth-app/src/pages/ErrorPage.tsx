import React from 'react';
import { alpha, Box, Container, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router';

export default function ErrorPage() {
  const theme = useTheme();
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
            Ooooops&hellip; 🥕
          </Typography>
          <Typography variant='body1' align='center' sx={{ mb: 4 }}>
            404 - Page not found!
          </Typography>
          <NavLink to='/'>
            get back home
          </NavLink>
        </Box>
      </Container>
    </Box>
  );
};
