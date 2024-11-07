import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext'; // Importamos el contexto de autenticación
import './Header.css'; // Importamos el archivo de estilos

const Header = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false); // Para manejar el menú desplegable

    // Función para alternar el estado del menú desplegable
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // Función para cerrar el menú desplegable al hacer clic fuera
    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    // Se cierra el dropdown si se hace clic fuera
    React.useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">MyApp</Link> {/* Aquí va el logo de la app */}
            </div>
            <nav>
                <ul>
                    {/* Links de navegación visibles siempre */}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>

                    {/* Si el usuario no está autenticado, mostramos Login y Sign In */}
                    {!isAuthenticated ? (
                        <>
                            <li><Link to="/login">Iniciar sesión</Link></li>
                            <li><Link to="/register">Registrarse</Link></li>
                        </>
                    ) : (
                        <>
                            {/* Si está autenticado, mostramos el icono de perfil */}
                            <li className="profile-icon" onClick={toggleDropdown}>
                                {/* Mostrar inicial del usuario en el círculo */}
                                <span className="profile-initial">{user.username[0]}</span>
                                {dropdownVisible && (
                                    <div className="dropdown-menu">
                                        <Link to="/profile">Ver perfil</Link>
                                        <button onClick={logout}>Cerrar sesión</button>
                                    </div>
                                )}
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;