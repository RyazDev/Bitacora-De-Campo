import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, isAuthenticated } = useContext(AuthContext);
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
            navigate('/profile');  // Redirige a la página de perfil si ya está autenticado
        }
    }, [isAuthenticated, navigate]);

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Reinicia el error
        setIsLoading(true);  // Empieza la carga

        // Validaciones de campos vacíos
        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            setIsLoading(false);
            return;
        }

        // Validar formato del correo
        if (!validateEmail(email)) {
            setError('Formato de correo electrónico inválido.');
            setIsLoading(false);
            return;
        }

        // Validar la contraseña
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            setIsLoading(false);
            return;
        }

        try {
            // Intentar iniciar sesión
            await login({ email, password });
            navigate('/profile');  // Redirige a la página de perfil después de iniciar sesión correctamente
        } catch (error) {
            // Manejo de errores
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Solicitud incorrecta. Verifica los datos ingresados.');
                        break;
                    case 401:
                        setError('Credenciales incorrectas. Inténtalo de nuevo.');
                        break;
                    case 404:
                        setError('Usuario no encontrado. Verifica tu correo electrónico.');
                        break;
                    case 500:
                        setError('Error del servidor. Intenta más tarde.');
                        break;
                    default:
                        setError('Error desconocido. Intenta de nuevo.');
                }
            } else if (error.message.includes('Network Error')) {
                setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
            } else {
                setError(error.message || 'Error al iniciar sesión.');
            }
        } finally {
            setIsLoading(false);  // Finaliza la carga
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                </button>
            </form>
            <a href="/register">¿No tienes cuenta? Regístrate</a>
        </div>
    );
};

export default LoginPage;
