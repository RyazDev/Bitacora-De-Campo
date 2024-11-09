import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Mi Aplicación de Platas. Todos los derechos reservados.</p>
        <nav className="footer-nav">
          <a href="/">Inicio</a>
          <a href="/about">Sobre Nosotros</a>
          <a href="/login">Iniciar Sesión</a>
          <a href="/register">Registrarse</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

