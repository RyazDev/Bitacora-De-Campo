// src/Pages/Register/Register.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';  // Hook de React Router

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('colaborador');  // Rol predeterminado
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();  // Inicializar el hook useHistory para redirigir

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('Registro exitoso! Redirigiendo al login.');
        // Redirigir a la página de login después de un registro exitoso
        history.push('/login');
      } else {
        setErrorMessage(data.errors ? data.errors[0] : 'Error en el registro');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nombre de usuario</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Rol</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
          >
            <option value="colaborador">Colaborador</option>
            <option value="investigador">Investigador</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Register;

