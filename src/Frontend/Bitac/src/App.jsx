import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext'; // Proveedor del contexto de autenticación
import Header from './Components/Header/Header'; // Componente de Header
import HomePage from './Pages/Home/Home'; // Página principal
import AboutPage from './Pages/About/About'; // Página sobre nosotros
import LoginPage from './Pages/Login/Login'; // Página de login
import RegisterPage from './Pages/Register/Register'; // Página de registro
import ProfilePage from './pages/Profile/Profile'; // Página de perfil
import ProtectedRoute from './Components/ProtectedRoute'; // Ruta protegida

function App() {
  return (
    // Envuelve toda la aplicación con AuthProvider para que el estado de autenticación esté disponible
    <AuthProvider>
      <Router>
        <Header /> {/* Header visible en todas las páginas */}

        {/* Definición de las rutas */}
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Ruta protegida que solo puede ser accedida si el usuario está autenticado */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute> {/* Verifica si el usuario está autenticado */}
                <ProfilePage /> {/* Si está autenticado, accede al perfil */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

