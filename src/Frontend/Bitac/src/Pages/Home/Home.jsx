import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Bar, Pie } from 'react-chartjs-2'; // Importar componentes de gráficos
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import './Home.css';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const handleNavigate = () => {
        if (isAuthenticated) {
            navigate('/fieldlogs');
        } else {
            navigate('/login');
        }
    };

    // Datos para el gráfico de barras
    const barData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
            {
                label: 'Ahorro de Agua (%)',
                data: [25, 30, 35, 40, 45],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Datos para el gráfico de pastel
    const pieData = {
        labels: ['Salud de Plantas Mejorada', 'Productividad Aumentada', 'Otros'],
        datasets: [
            {
                data: [60, 30, 10],
                backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
                borderColor: ['#4caf50', '#ff9800', '#f44336'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="home-container">
            {/* Sección 1: Introducción */}
            <section className="section intro-section">
                <div className="intro-description">
                    <h1>Bienvenido a Nuestro Sistema de Gestión de Plantas</h1>
                    <p>Descubre cómo nuestro sistema innovador puede ayudarte a gestionar eficientemente tus plantas, optimizando la distribución de recursos, el monitoreo en tiempo real y la programación de mantenimiento. Con herramientas avanzadas de análisis y reportes, podrás mejorar la productividad, reducir tiempos de inactividad y garantizar un entorno de trabajo más seguro y organizado. Con nuestra plataforma, la gestión de tus plantas será más ágil, precisa y rentable.</p>
                    <button className="star-button" onClick={handleNavigate}>Comenzar</button>

                </div>
                <div className="intro-image">
                    <img src="https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/06/26/5fa91ffc9f64f.jpeg" alt="a" />
                </div>
            </section>

            {/* Sección 2: Vista previa del sistema */}
            <section className="section preview-section">
                <h2>Vista Previa del Sistema</h2>
                <p>Una herramienta completa para gestionar, monitorear y mejorar tus operaciones con plantas.</p>
                <div className="system-preview">
                    <div className="preview-item">
                        <i className="fas fa-calendar-alt"></i>
                        <p>Gestiona tus riegos diarios con recordatorios automáticos.</p>
                    </div>
                    <div className="preview-item">
                        <i className="fas fa-seedling"></i>
                        <p>Monitorea el crecimiento de tus plantas fácilmente.</p>
                    </div>
                    <div className="preview-item">
                        <i className="fas fa-flask"></i>
                        <p>Controla y aplica fertilizantes según las necesidades.</p>
                    </div>
                    <div className="preview-item">
                        <i className="fas fa-chart-line"></i>
                        <p>Obtén reportes detallados para tomar decisiones inteligentes.</p>
                    </div>
                </div>
            </section>

            {/* Sección 3: Estadísticas */}
            <section className="section stats-section">
                <h2>Estadísticas de Impacto</h2>
                <div className="chart-container">
                    <div className="chart-item">
                        <h3>Ahorro de Agua</h3>
                        <Bar data={barData} />
                    </div>
                    <div className="chart-item">
                        <h3>Distribución de Impacto</h3>
                        <Pie data={pieData} />
                    </div>
                    <p>Estas estadísticas son solo una pequeña parte del impacto que nuestro sistema tiene en la optimización de recursos. 
                Con estos datos, puedes tomar decisiones informadas para continuar mejorando el rendimiento y la sostenibilidad en tu proceso de cultivo.</p>
                </div>
                
            </section>

            {/* Sección 4: Beneficios */}
            <section className="section call-to-action-section">
                <h2>Beneficios de Usar Nuestro Sistema</h2>
                <ul className="benefits-list">
                    <li><i className="fas fa-clock"></i> Ahorro de Tiempo y Recursos  - Optimiza tareas repetitivas y mejora la eficiencia operativa.</li>
                    <li><i className="fas fa-tachometer-alt"></i> Monitoreo Eficiente y en Tiempo Real - Accede a datos actualizados en tiempo real para decisiones rápidas.</li>
                    <li><i className="fas fa-database"></i> Decisiones Basadas en Datos - Obtén análisis detallados para decisiones más informadas.</li>
                    <li><i className="fas fa-leaf"></i> Optimización del Proceso de Crecimiento - Mejora el crecimiento de tus plantas ajustando factores clave.</li>
                </ul>
                <div className="cta-button-container">
                    <button className="cta-button" onClick={handleNavigate}>Comenzar</button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;