import React from 'react';
import './About.css'; // Asegúrate de que el archivo de CSS está bien enlazado

const AboutPage = () => {
    return (
        <div className="about-container">
            {/* Sección 1: Presentación */}
            <section className="about-introduction">
                <h1>Acerca de la Aplicación</h1>
                <p>Bienvenido a nuestro sistema de gestión de plantas, una herramienta integral que te permite manejar eficientemente todas las necesidades de tus plantas en un solo lugar. Ya seas un horticultor profesional o simplemente un aficionado, esta aplicación ha sido diseñada para optimizar el cuidado, el seguimiento y la productividad de tus plantas.</p>
            </section>

            {/* Sección 2: Propósito */}
            <section className="about-purpose">
                <h2>¿Por qué fue desarrollada?</h2>
                <p>El propósito de esta aplicación es proporcionar a los usuarios una forma sencilla y eficaz de gestionar sus plantas, controlando factores importantes como el riego, el monitoreo del crecimiento, el uso de fertilizantes y mucho más. Buscamos crear una solución que no solo sea funcional, sino también fácil de usar, ayudando a las personas a tomar decisiones informadas sobre el cuidado de sus plantas.</p>
            </section>

            {/* Sección 3: Los Desarrolladores */}
            <section className="about-developers">
                <h2>Desarrollada por</h2>
                <p>Un equipo de desarrolladores apasionados por la naturaleza y la tecnología, con experiencia en diseño de software y soluciones de automatización. Creemos en la importancia de hacer que el cuidado de las plantas sea más accesible y eficiente para todos.</p>
                <div className="developer-profiles">
                    <div className="developer">
                        <h3>Juan Pérez</h3>
                        <p>Desarrollador Backend</p>
                    </div>
                    <div className="developer">
                        <h3>Ana González</h3>
                        <p>Desarrolladora Frontend</p>
                    </div>
                    <div className="developer">
                        <h3>David Rodríguez</h3>
                        <p>Diseñador UI/UX</p>
                    </div>
                </div>
            </section>

            {/* Sección 4: Tecnologías Utilizadas */}
            <section className="about-technologies">
                <h2>Tecnologías Utilizadas</h2>
                <p>La aplicación fue desarrollada utilizando tecnologías modernas para asegurar un rendimiento óptimo y una experiencia de usuario fluida. Algunas de las principales tecnologías utilizadas son:</p>
                <ul>
                    <li>React.js para el frontend</li>
                    <li>Node.js y Express para el backend</li>
                    <li>MongoDB para la base de datos</li>
                    <li>CSS3 y Flexbox para el diseño responsivo</li>
                </ul>
            </section>
        </div>
    );
};

export default AboutPage;