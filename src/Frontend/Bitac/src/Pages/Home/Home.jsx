import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext'; // Asegúrate de importar correctamente el contexto
import './Home.css';

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext); // Verificamos si el usuario está autenticado

    // Función para manejar la navegación del botón "Comenzar"
    const handleNavigate = () => {
        if (isAuthenticated) {
            navigate('/bitacoras'); // Si el usuario está autenticado, va a la página de Bitácoras
        } else {
            navigate('/login'); // Si no está autenticado, va a la página de Login
        }
    };

    return (
        <div className="home-container">
            {/* Sección 1: Introducción */}
            <section className="section intro-section">
                <div className="intro-description">
                    <h1>Bienvenido a Nuestro Sistema de Gestión de Plantas</h1>
                    <p>Descubre cómo nuestro sistema puede ayudarte a gestionar eficientemente tus plantas y mejorar la productividad.</p>
                </div>
                <div className="intro-image">
                    <img src="ruta-a-la-imagen.jpg" alt="Imagen de la planta" />
                    <button className="start-button" onClick={handleNavigate}>Comenzar</button>
                </div>
            </section>

            {/* Sección 2: Vista previa del sistema */}
            <section className="section preview-section">
                <h2>Vista Previa del Sistema</h2>
                <p>Una herramienta completa para gestionar, monitorear y mejorar tus operaciones con plantas.</p>
                <div className="system-preview">
                    <div className="preview-item">Calendario de Riegos</div>
                    <div className="preview-item">Seguimiento de Crecimiento</div>
                    <div className="preview-item">Control de Fertilizantes</div>
                    <div className="preview-item">Reportes y Estadísticas</div>
                </div>
            </section>

            {/* Sección 3: Llamada a la acción */}
            <section className="section call-to-action-section">
                <h2>Beneficios de Usar Nuestro Sistema</h2>
                <ul className="benefits-list">
                    <li>Ahorro de Tiempo y Recursos</li>
                    <li>Monitoreo Eficiente y en Tiempo Real</li>
                    <li>Decisiones Basadas en Datos</li>
                    <li>Optimización del Proceso de Crecimiento</li>
                </ul>
                <button className="cta-button" onClick={handleNavigate}>Comenzar</button>
            </section>
        </div>
    );
};

export default HomePage;