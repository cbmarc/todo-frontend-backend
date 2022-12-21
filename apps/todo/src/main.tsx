import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([{ path: '/sign-in', element: <SignIn /> }]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
