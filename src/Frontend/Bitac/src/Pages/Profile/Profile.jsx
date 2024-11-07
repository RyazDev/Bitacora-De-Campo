import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();  // Para redirigir si no hay token

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        history.push('/login');  // Si no hay token, redirigir al login
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/auth/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Enviar el token en el encabezado
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setUser(data);  // Almacenar los datos del usuario
        } else {
          setErrorMessage('Error al obtener los datos del usuario.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error al conectar con el servidor.');
      }
    };

    fetchUserData();
  }, [history]);

  if (!user) {
    return <p>Cargando...</p>;  // Mostrar mensaje mientras se carga
  }

  return (
    <div>
      <h2>Mi Perfil</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <p><strong>Nombre de usuario:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;
