import { createBrowserRouter } from 'react-router';
import App from '../App';
import FinAppErrorPage from "../pages/FinAppErrorPage.tsx";
import Layout from "../pages/Layout.tsx";
import DashboardPage from "../pages/DashboardPage.tsx";


export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
        ]
      },
      {
        path: '*',
        Component: FinAppErrorPage,
      }
    ],
  }
]);