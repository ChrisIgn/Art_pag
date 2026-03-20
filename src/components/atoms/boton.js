// src/components/atoms/boton.js

import React from 'react';
import './boton.css';

/**
 * Boton
 * -------
 * Componente de botón reutilizable y accesible.
 */
const Boton = (props) => {
  const { texto, onClick, variante = 'primario' } = props;

  return (
    <button
      className={`boton-base ${variante}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Boton;