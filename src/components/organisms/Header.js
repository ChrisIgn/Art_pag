// src/components/organisms/Header.jsx

import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; // Añadir esta importación

// Simulamos que la página activa se pasa como prop desde HomePage
// Por ahora, la definimos internamente como 'HOME' para la demo.
export const Header = ({ paginaActiva = 'HOME' }) => { 
  const [menuOpen, setMenuOpen] = useState(false);

const links = [
    { name: "HOME", url: "/#home", isRoute: true }, // Apunta a la raíz + ancla
    { name: "PERSONAL STYLE", url: "#personal", isRoute: false },
    { name: "STYLES", url: "#other", isRoute: false },
    { name: "ABOUT ME", url: "#about", isRoute: false },
    { name: "ADMIN", url: "/admin", isRoute: true }, // Nueva ruta para tu panel
];

  return (
    <header className="new-main-header">
      <div className="header-top">
        <div className="header-title">Eri</div>
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