import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Usamos Navigate para redirigir
import { AuthContext } from '../Context/AuthContext'; // Importamos el contexto de autenticación

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Obtenemos el estado de autenticación

  // Si el usuario no está autenticado, lo redirigimos al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirige al login
  }

  // Si está autenticado, renderizamos la ruta protegida
  return children;
};

export default ProtectedRoute;
