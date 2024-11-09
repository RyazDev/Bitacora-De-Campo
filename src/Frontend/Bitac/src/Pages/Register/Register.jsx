import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Usamos useNavigate en lugar de useHistory
import './Register.css'; // Importar el archivo CSS personalizado

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('colaborador');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Usamos useNavigate aquí

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
        navigate('/login');  // Usamos navigate para redirigir
      } else {
        setErrorMessage(data.errors ? data.errors[0] : 'Error en el registro');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
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
        <button type="submit" className="submit-btn">Registrar</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Register;
