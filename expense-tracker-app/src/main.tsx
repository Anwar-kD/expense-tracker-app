import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import NotFoundPage from './pages/NotFoundPage';
import { Auth } from './pages/auth/index.tsx';
import {ExpenseTracker} from './pages/expense-tracker/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: < Auth/>,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/expense-tracker',
    element: < ExpenseTracker/>,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
