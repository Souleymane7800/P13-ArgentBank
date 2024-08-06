import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

/**
 * A higher-order component that protects routes.
 * Checks if the user is authenticated and redirects to the login page if not.
 *
 * @param {React.ReactNode} children The children components to render if the user is authenticated.
 * @returns {JSX.Element} Either the children or a redirect to the login page.
 */
interface ProtectedRouteProps {
      children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
      const isAuthenticated = useSelector(
            (state: RootState) => !!state.auth.token
      );
      const location = useLocation();

      if (!isAuthenticated) {
            return <Navigate to='/login' state={{ from: location }} replace />;
      }

      return <>{children}</>;
};

export default ProtectedRoute;
