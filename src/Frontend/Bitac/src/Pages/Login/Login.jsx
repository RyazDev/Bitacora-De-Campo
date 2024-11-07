// src/Pages/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiar aquí
import './assets/styles/login.css'; 
import './assets/styles/global.css'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializamos useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                navigate('/profile');  // Redirigimos con useNavigate
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Hubo un error en la conexión.');
        }
    };

    return (
        <div className="container">
            <div className="form-container login-form-container">
                <h1>Iniciar sesión</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Iniciar sesión</button>
                </form>
                <a href="/register">¿No tienes cuenta? Regístrate</a>
            </div>
        </div>
    );
};

export default LoginPage;

