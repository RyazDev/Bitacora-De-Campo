import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      // Si no hay token, redirigimos al login
      if (!token) {
        setErrorMessage('No se encontró un token. Por favor, inicia sesión.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Datos del usuario:', data);  // Log para depurar
          setUser(data);
        } else if (response.status === 401) {
          setErrorMessage('Token inválido o expirado. Por favor, inicia sesión nuevamente.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setErrorMessage('Error al obtener los datos del usuario. Intenta nuevamente más tarde.');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        setErrorMessage('Error al conectar con el servidor.');
      }
    };

    // Solo ejecutamos la función de obtener datos si el token está presente
    fetchUserData();

    // La dependencia de 'navigate' es correcta ya que no cambia durante el ciclo de vida del componente
  }, [navigate]);

  const handleEditProfile = () => {
    navigate('/edit-profile'); // Ruta para editar el perfil
  };

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (!user) {
    return <p className="loading">Cargando datos del usuario...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Mi Perfil</h2>
        </div>
        <div className="profile-content">
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/150" alt="Avatar" /> {/* Foto de usuario placeholder */}
          </div>
          <div className="profile-details">
            <p><strong>Nombre de usuario:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.role}</p>
            <button className="edit-btn" onClick={handleEditProfile}>Editar Perfil</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
