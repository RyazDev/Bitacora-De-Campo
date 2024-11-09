import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './Header.css';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const profileRef = useRef(null);
    const menuRef = useRef(null);

    // Verificar el tamaño de pantalla
    const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    // Alternar el menú hamburguesa
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setProfileDropdownOpen(false); // Cerrar el dropdown de perfil al abrir el menú
    };

    // Alternar el dropdown de perfil
    const toggleProfileDropdown = (e) => {
        e.stopPropagation();
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    // Cerrar menú al hacer clic fuera
    const handleClickOutside = (e) => {
        if (
            profileRef.current && !profileRef.current.contains(e.target) &&
            menuRef.current && !menuRef.current.contains(e.target)
        ) {
            setMenuOpen(false);
            setProfileDropdownOpen(false);
        }
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">MyApp</Link>
                </div>

                {/* Botón de menú hamburguesa para móviles */}
                {isMobile && (
                    <button className="menu-toggle" onClick={toggleMenu}>
                        ☰
                    </button>
                )}

                {/* Menú desplegable para móviles */}
                {isMobile && menuOpen && (
                    <nav ref={menuRef} className="nav-menu-mobile">
                        <ul>
                            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                            <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                            {isAuthenticated ? (
                                <>
                                    <li><Link to="/profile" onClick={toggleMenu}>Perfil</Link></li>
                                    <li><button onClick={logout}>Cerrar sesión</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/login" onClick={toggleMenu}>Iniciar sesión</Link></li>
                                    <li><Link to="/register" onClick={toggleMenu}>Regístrate aquí</Link></li>
                                </>
                            )}
                        </ul>
                    </nav>
                )}

                {/* Menú para pantallas grandes */}
                {!isMobile && (
                    <nav className="nav-menu-large">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            {isAuthenticated ? (
                                <li ref={profileRef} className="dropdown">
                                    <span className="profile-toggle" onClick={toggleProfileDropdown}>Perfil</span>
                                    {profileDropdownOpen && (
                                        <ul className="profile-dropdown">
                                            <li><Link to="/profile" onClick={() => setProfileDropdownOpen(false)}>Ver Perfil</Link></li>
                                            <li><button onClick={logout}>Cerrar sesión</button></li>
                                        </ul>
                                    )}
                                </li>
                            ) : (
                                <>
                                    <li><Link to="/login">Iniciar sesión</Link></li>
                                    <li><Link to="/register">Regístrate</Link></li>
                                </>
                            )}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
