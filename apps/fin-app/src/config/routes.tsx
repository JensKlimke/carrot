import { createBrowserRouter } from 'react-router';
import App from '../App';
import FinAppErrorPage from "../pages/FinAppErrorPage.tsx";


export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: FinAppErrorPage,
      },
      {
        path: '*',
        Component: FinAppErrorPage,
      }
    ],
  }
]);