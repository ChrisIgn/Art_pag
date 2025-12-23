// src/components/Boton.jsx

import React from 'react';
import './boton.css'
//import './Boton.css'; // Importamos un archivo de estilos (Paso 4)

// El componente recibe 'props' como su único argumento
const Boton = (props) => {
  // 1. Desestructuración de props para usarlas fácilmente
  const { texto, onClick, variante = 'primario' } = props;

  // 2. Retorna el JSX (lo que se renderizará)
  return (
    <button 
      className={`boton-base ${variante}`}
      // La función 'onClick' que recibe como prop se asigna al evento 'onClick' del botón real
      onClick={onClick}
    >
      {/* El texto que recibe como prop se muestra dentro del botón */}
      {texto}
    </button>
  );
};

export default Boton;