// src/services/authService.js
import axios from 'axios';

// Definir la URL base de la API (ajústala a tu entorno)
const API_URL = 'http://localhost:5000'; // Cambia esto a la URL correcta de tu backend

// Registrar un nuevo usuario
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error en el servidor';
    }
};

// Iniciar sesión y obtener el token
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { token } = response.data;

        // Guardar el token en localStorage
        localStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error en el servidor';
    }
};

// Obtener el usuario autenticado (requiere el token)
export const getAuthenticatedUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no encontrado');
    }

    try {
        const response = await axios.get(`${API_URL}/auth/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error en el servidor';
    }
};

// Cerrar sesión (limpiar token)
export const logoutUser = () => {
    localStorage.removeItem('token');
};

