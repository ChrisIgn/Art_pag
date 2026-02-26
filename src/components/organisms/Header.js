// src/components/organisms/Header.jsx

import React, { useState, useEffect} from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; // Añadir esta importación
import { useConfig } from '../../hooks/useConfig';
import { artistaConfig } from '../../config/artistaConfig';

// Simulamos que la página activa se pasa como prop desde HomePage
// Por ahora, la definimos internamente como 'HOME' para la demo.
export const Header = ({ paginaActiva }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { config } = useConfig();

    useEffect(() => {
        const handleScroll = () => {
            // Si bajamos más de 50px, el header se vuelve sólido
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);


const links = [
    { name: "HOME", url: "/#home", isRoute: false }, // Apunta a la raíz + ancla
    { name: "PERSONAL STYLE", url: "#personal", isRoute: false },
    { name: "Ecos", url: "/#ecos-del-mundo-ancla", isRoute: false }, // Apunta a la sección de galería
    { name: "Galeria", url: "#other", isRoute: false },
    { name: "ABOUT ME", url: "#about", isRoute: false },
    //{ name: "ADMIN", url: "/admin", isRoute: true }, // Nueva ruta para tu panel
];

  return (
    <header className={`new-main-header ${isScrolled ? 'header-solid' : 'header-transparent'}`}>
      <div className="header-top">
        <div className="header-brand-container">
          <div className="header-title">{artistaConfig.nombre}</div>
          
          {/* Nuevo: Indicador de Comisiones al lado del nombre */}
          <div className={`status-pill ${config.comisionesAbiertas ? 'open' : 'closed'}`}>
            <span className="status-dot"></span>
            <span className="status-label">
              {config.comisionesAbiertas ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`hamburger ${menuOpen ? 'is-open' : ''}`} />
        </button>
      </div>

      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            {links.map((link) => (
                <li
                    key={link.name}
                    className={link.name === paginaActiva ? 'nav-item active' : 'nav-item'}
                    onClick={() => setMenuOpen(false)}
                >
                    {link.isRoute ? (
                        <Link to={link.url}>{link.name}</Link>
                    ) : (
                        <a href={link.url}>{link.name}</a>
                    )}
                </li>
            ))}
          </ul>
        </nav>
    </header>
  );
};

export default Header;