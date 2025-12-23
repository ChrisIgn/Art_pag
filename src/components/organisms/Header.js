// src/components/organisms/Header.jsx

import React from 'react';
import './Header.css';

// Simulamos que la página activa se pasa como prop desde HomePage
// Por ahora, la definimos internamente como 'HOME' para la demo.
export const Header = ({ paginaActiva = 'HOME' }) => { 
  
  const links = [
    { name: "HOME", url: "#home" },
    { name: "PERSONAL STYLE", url: "#personal" },
    { name: "STYLES", url: "#other" },
    { name: "ABOUT ME", url: "#about" },
  ];

  return (
    <header className="new-main-header">
      
      {/* 1. Título Superior Centrado */}
      <div className="header-title">
        Aponia_Art
      </div>
      
      {/* 2. Barra de Navegación */}
      <nav className="header-nav">
        <ul>
          {links.map((link) => (
            <li
              key={link.name}
              // Aplicamos la clase 'active' si el nombre del link coincide con la página activa
              className={link.name === paginaActiva ? 'nav-item active' : 'nav-item'}
            >
              <a href={link.url}>
                {link.name}
              </a>
            </li> 
          ))}
        </ul> 
      </nav>

      
    </header>
  );
};

export default Header;