import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

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