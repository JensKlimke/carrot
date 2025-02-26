import { createTheme } from '@mui/material/styles';
import React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import {TFunction} from "i18next";

declare module '@mui/material/styles' {
  interface Palette {
    primaryTransparent: { main: string };
  }
  interface PaletteOptions {
    primaryTransparent?: { main: string };
  }
}

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#245620' },                         // Light theme primary
        secondary: { main: '#cd4412' },                       // Light theme secondary
        primaryTransparent: { main: alpha('#4caf50', 0.5) },  // Transparent primary
      },
    },
    dark: {
      palette: {
        primary: { main: '#257f1a' },                         // Dark theme primary (adjust as needed)
        secondary: { main: '#f28e38' },                       // Dark theme secondary
        primaryTransparent: { main: alpha('#4caf50', 0.5) },  // Transparent primary
      },
    },
  },
});

export const branding = (t : TFunction) => ({
  logo: <Box
    component='div'
    sx={{
      margin: 0,                // Removes extra spacing
      padding: 0,               // Removes extra spacing
      fontSize: '2em',          // Ensures the emoji scales relative to the container
      lineHeight: 1,            // Removes extra vertical spacing
      display: 'inline-flex',   // Aligns the emoji with other content (like icons)
      alignItems: 'center',     // Centers the emoji vertically if in a flex container
      justifyContent: 'center', // Centers the emoji horizontally if needed
    }}
  >
    { t('auth.labels.app_icon') }
  </Box>,
  title: t('auth.labels.app_title_short'),
  homeUrl: '/',
});