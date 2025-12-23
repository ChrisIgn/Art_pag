import React from 'react';
import './Galeria_oi.css';

// 1. Aceptamos la nueva prop 'onClick'
const Arteoi = ({ imagenSrc, titulo, onClick }) => {
  return (
    // 2. Aplicamos el evento 'onClick' al contenedor principal
    <div className="arte_oi-contenedor" onClick={onClick}>
      <img src={imagenSrc} alt={titulo} className="arte_oi-imagen" />
      
      <div className="arte_oi-overlay">
        <p className="arte_oi-titulo">{titulo}</p>
      </div>
    </div>
  );
};

export default Arteoi;