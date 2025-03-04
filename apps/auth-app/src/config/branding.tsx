import {TFunction} from "i18next";
import Box from "@mui/material/Box";

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