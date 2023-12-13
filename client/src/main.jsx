import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'vite/modulepreload-polyfill';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { CreatePlan } from './pages/CreatePlan.jsx';
import { SignIn } from './pages/SignIn.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { ViewPlans } from './pages/ViewPlans.jsx';

const router = createHashRouter([
  {
    path: '',
    element: (
      <body>
        <div id="app">
          <App />
        </div>
        <div id="sign-in">
          <SignIn />
        </div>
      </body>
    ),
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/create_plan',
    element: <CreatePlan />,
  },
  {
    path: '/sign_up',
    element: <SignUp />,
  },
  {
    path: '/view_plans',
    element: <ViewPlans />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
