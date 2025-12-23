// src/components/molecules/Modal.jsx

import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ obra, onClose, onNavigate }) => {
  
  // 1. Hook useEffect movido al principio para cumplir la Regla de Hooks
  useEffect(() => {
    // Si no hay obra, no hay nada que escuchar
    if (!obra) {
        return; 
    }
    
    const handleKeydown = (event) => {
      // Navegación con flechas y Escape para cerrar
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onNavigate(1);
      } else if (event.key === 'ArrowLeft') {
        onNavigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    
    // Función de limpieza
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose, onNavigate, obra]); // Añadimos 'obra' para que el efecto se limpie/reinicie correctamente

  // Si no hay obra seleccionada (null), no renderiza nada
  if (!obra) {
    return null;
  }

  // 2. El JSX (Interfaz)
  return (
    <div className="modal-backdrop" onClick={onClose}>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Botón Anterior */}
        <button className="modal-nav-button prev" onClick={() => onNavigate(-1)}>
          &lt; 
        </button>

        {/* Botón Siguiente */}
        <button className="modal-nav-button next" onClick={() => onNavigate(1)}>
          &gt; 
        </button>

        {/* Botón Cerrar (X) */}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>

        {/* Contenedor Flexible para Imagen y Descripción */}
        <div className="modal-body-flex">
          
          {/* Columna de Descripción (Izquierda) */}
          <div className="modal-descripcion-wrapper">
            <h3 className="modal-titulo-grande">{obra.titulo}</h3>
            <p className="modal-descripcion-texto">{obra.descripcion}</p> 
            {/* Si quieres añadir más detalles de la obra, este es el lugar. */}
          </div>

          {/* Columna de Imagen (Derecha) */}
          <div className="modal-imagen-wrapper">
            <img 
              src={obra.imagenSrc} 
              alt={obra.titulo} 
              className="modal-imagen-principal"
              key={obra.id} // Forzar re-renderizado para la animación
            />
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Modal;