import React, { useContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom'; // Usamos Navigate para redirigir
import { AuthContext } from '../Context/AuthContext'; // Importamos el contexto de autenticación

const ProtectedRoute = ({ children }) => {
  // Obtenemos el estado de autenticación desde el contexto
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Usamos useMemo para optimizar el acceso a isAuthenticated. Aunque en este caso no es estrictamente necesario,
  // puede ayudar si el contexto es complejo o cambia con frecuencia.
  const shouldRedirect = useMemo(() => !isAuthenticated, [isAuthenticated]);

  // Si la autenticación aún está en proceso (loading), podemos evitar que el componente se renderice y mostrar un loading o nada
  if (loading) {
    return <div>Cargando...</div>; // O cualquier otro indicador de carga
  }

  // Si no está autenticado, redirigimos al login
  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderizamos la ruta protegida
  return children;
};

export default ProtectedRoute;

