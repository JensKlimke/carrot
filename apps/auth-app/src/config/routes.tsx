import { createBrowserRouter } from 'react-router';
import App from '../App';
import AuthPage from '../pages/AuthPage';
import AuthErrorPage from "../pages/AuthErrorPage.tsx";


export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: AuthPage,
      },
      {
        path: '*',
        Component: AuthErrorPage,
      }
    ],
  }
]);