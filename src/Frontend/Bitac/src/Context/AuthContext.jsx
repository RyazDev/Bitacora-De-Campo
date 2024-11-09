import React, { createContext, useState, useEffect } from 'react';
import { getAuthenticatedUser, loginUser, registerUser, logoutUser } from '../Services/authService';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {  // Asegúrate de que children sea recibido como prop
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Verificar si hay un token y obtener los datos del usuario
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getAuthenticatedUser(token);
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Error al verificar autenticación:', error);
                    setIsAuthenticated(false);
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // No hay token, no es necesario verificar más
            }
        };

        checkAuth();
    }, []);

    // Función para iniciar sesión en el contexto
    const login = async (credentials) => {
        setLoading(true);
        try {
            const data = await loginUser(credentials);
            localStorage.setItem('token', data.token);  // Guardar el token en localStorage
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error en login:', error);
            throw new Error(error.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    // Función para registrar un nuevo usuario
    const register = async (userData) => {
        try {
            await registerUser(userData);
            await login(userData); // Iniciar sesión automáticamente después de registrar
        } catch (error) {
            console.error('Error al registrar usuario:', error.message || error);
            throw error;
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        logoutUser();
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        setUser(null);
        setIsAuthenticated(false);
    };

    // Valor del contexto
    const contextValue = {
        user,
        isAuthenticated,
        login,
        register,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {loading ? (
                <div className="loading">Cargando...</div>
            ) : (
                children  // Aquí pasamos los componentes hijos correctamente
            )}
        </AuthContext.Provider>
    );
};