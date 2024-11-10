// src/pages/LoginPage.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // Validación del formato de correo electrónico
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validación de la contraseña
    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'La contraseña debe tener al menos 8 caracteres.';
        }
        if (!/[0-9]/.test(password)) {
            return 'La contraseña debe contener al menos un número.';
        }
        return null;
    };

    // Redirección automática si el usuario ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile'); // Redirige a la página de perfil si ya está autenticado
        }
    }, [isAuthenticated, navigate]);

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reinicia el error

        // Validaciones de campos vacíos
        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        // Validar formato del correo
        if (!validateEmail(email)) {
            setError('Formato de correo electrónico inválido.');
            return;
        }

        // Validar la contraseña
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            // Intentar iniciar sesión
            await login({ email, password });
            navigate('/profile'); // Redirige a la página de perfil después de iniciar sesión correctamente
        } catch (error) {
            // Mostrar el mensaje de error proporcionado por el servicio de autenticación
            setError(error.message || 'Error al iniciar sesión.');
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar sesión</h1>
            {error && <p className="error-message">{error}</p>}
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                </button>
            </form>
            <a href="/register">¿No tienes cuenta? Regístrate</a>
        </div>
    );
};

export default LoginPage;
