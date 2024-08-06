import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './App';
import SignIn from './components/SignIn';
import './index.css';
import ProfilePage from './components/ProfilePage';
import { Provider } from 'react-redux';
import { store } from './app/store';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * Renders the React application to the DOM.
 * Handles routing, Redux store, and error handling.
 */
function renderApp() {
      const rootElement = document.getElementById('root');
      if (!rootElement) {
            console.error(
                  "Unable to render the React application. The root element with ID 'root' could not be found in the HTML document. Please ensure there exists an HTML element with the ID 'root' in your HTML file."
            );
            return;
      }

      const router = createBrowserRouter([
            {
                  path: '/',
                  element: <Home />,
            },
            {
                  path: '/login',
                  element: <SignIn />,
            },
            {
                  path: '/profile',
                  element: (
                        <ProtectedRoute>
                              <ProfilePage />
                        </ProtectedRoute>
                  ),
            },
            {
                  path: '*',
                  element: <NotFound />,
            },
      ]);

      createRoot(rootElement).render(
            <React.StrictMode>
                  <Provider store={store}>
                        <RouterProvider router={router} />
                  </Provider>
            </React.StrictMode>
      );
}

document.addEventListener('DOMContentLoaded', renderApp);
