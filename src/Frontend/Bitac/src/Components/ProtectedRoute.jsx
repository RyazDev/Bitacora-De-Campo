import React, { useContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom'; 
import { AuthContext } from '../Context/AuthContext'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  const shouldRedirect = useMemo(() => !isAuthenticated, [isAuthenticated]);

  if (loading) {
    return <div>Cargando...</div>; 
  }

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

