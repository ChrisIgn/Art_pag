import React from 'react';
import './CategoriaLink.css';

// Usamos 'href' para la redirección
const CategoriaLink = ({ titulo, imagenSrc, href }) => {
  return (
    // Envolvemos todo en un 'a' (enlace)
    <a href={href} className="categoria-link-wrapper">
      <img src={imagenSrc} alt={`Ir a ${titulo}`} className="categoria-imagen" />
      <div className="categoria-overlay">
        <h3 className="categoria-titulo">{titulo}</h3>
      </div>
    </a>
  );
};

export default CategoriaLink;