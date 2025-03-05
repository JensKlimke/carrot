import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './config/routes';
import { StyledEngineProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import i18n from "@carrot/lang/src/i18n.ts";

// Init translation
i18n.init()
  .then(() => {console.info('i18n initialized')})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </StrictMode>,
)




