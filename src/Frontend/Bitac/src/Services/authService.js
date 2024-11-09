// src/services/authService.js
import axios from 'axios';

// Definir la URL base de la API (ajústala a tu entorno)
const API_URL = 'http://localhost:5000/api/users';

/**
 * Registrar un nuevo usuario
 * @param {Object} userData - Datos del usuario
 * @returns {Object} - Respuesta del servidor
 */
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error en el servidor';
    }
};

/**
 * Iniciar sesión y obtener el token
 * @param {Object} credentials - Credenciales del usuario
 * @returns {Object} - Datos del usuario autenticado
 */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { token, user } = response.data;

        // Guardar el token y datos del usuario en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error en el servidor';
    }
};

/**
 * Obtener el usuario autenticado
 * @returns {Object} - Datos del usuario autenticado
 */
export const getAuthenticatedUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no encontrado. Debes iniciar sesión.');
    }

    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`, // Aquí se envía el token
            },
        });

        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error.response?.data);
        throw error.response?.data || 'Error en el servidor';
    }
};


/**
 * Cerrar sesión y limpiar almacenamiento local
 */
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

