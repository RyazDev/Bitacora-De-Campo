import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Asegúrate de que esté bien referenciado el archivo de CSS

const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate('/login'); // Redirige a la página de inicio de sesión
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
                    <button className="start-button" onClick={handleNavigateToLogin}>Comenzar</button>
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
                <button className="cta-button" onClick={handleNavigateToLogin}>Comenzar</button>
            </section>
        </div>
    );
};

export default HomePage;