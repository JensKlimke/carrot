import { createBrowserRouter } from 'react-router';
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import AuthPage from "./pages/AuthPage";


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
        Component: ErrorPage,
      }
    ],
  }
]);