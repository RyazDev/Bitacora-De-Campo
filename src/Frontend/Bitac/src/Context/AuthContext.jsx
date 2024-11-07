import React, { createContext, useState, useEffect } from 'react';
import { getAuthenticatedUser, loginUser, registerUser, logoutUser } from '../Services/authService';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga

    // Verificar si hay un token al iniciar la aplicación
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await getAuthenticatedUser();
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Función para hacer login
    const login = async (credentials) => {
        try {
            const data = await loginUser(credentials);
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    };

    // Función para hacer register
    const register = async (userData) => {
        try {
            await registerUser(userData);
            // Después de registrarse, podemos hacer login automáticamente
            await login(userData);
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        logoutUser();
        setIsAuthenticated(false);
        setUser(null);
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
            {children}
        </AuthContext.Provider>
    );
};

