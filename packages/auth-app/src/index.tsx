import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import {router} from './config/routes';
import i18n from './config/i18n';

// Init translation
i18n.init().then(() => {console.info('i18n initialized')});
i18n.changeLanguage('de').then(_ => console.info('i18n language changed to de'));

// Create the root of the application and render the App component.
ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>
);
