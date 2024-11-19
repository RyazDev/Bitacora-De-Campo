import React, { createContext, useState, useEffect } from 'react';
import { getAuthenticatedUser, loginUser, registerUser, logoutUser } from '../Services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Verificar token y obtener los datos del usuario
    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem('token'); // Usar sessionStorage para múltiples sesiones
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
                setLoading(false); 
            }
        };

        checkAuth();

        // Escuchar cambios en el almacenamiento para cerrar sesión si es necesario
        const syncLogout = (event) => {
            if (event.key === 'token' && event.newValue === null) {
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        window.addEventListener('storage', syncLogout);

        return () => {
            window.removeEventListener('storage', syncLogout);
        };
    }, []);

    // Función para iniciar sesión en el contexto
    const login = async (credentials) => {
        setLoading(true);
        try {
            const data = await loginUser(credentials);
            sessionStorage.setItem('token', data.token);  // Usar sessionStorage
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error en login:', error);
            throw new Error(error.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            await registerUser(userData);
            await login(userData); // Iniciar sesión después de registro
        } catch (error) {
            console.error('Error al registrar usuario:', error.message || error);
            throw error;
        }
    };

    const logout = () => {
        sessionStorage.removeItem('token'); // Usar sessionStorage
        setUser(null);
        setIsAuthenticated(false);
    };

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
                children  
            )}
        </AuthContext.Provider>
    );
};