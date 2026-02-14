// src/components/molecules/Modal.jsx
import React, { useEffect, useRef } from 'react'; // Añadimos useRef
import './Modal.css';

const Modal = ({ obra, onClose, onNavigate }) => {
  const imageRef = useRef(null); // Referencia para la imagen

  useEffect(() => {
    if (!obra) return;
    
    const handleKeydown = (event) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') onNavigate(1);
      else if (event.key === 'ArrowLeft') onNavigate(-1);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [onClose, onNavigate, obra]);

  // Función para ver en pantalla completa nativa
// Función para ver en pantalla completa nativa corregida
  const verPantallaCompleta = () => {
    // Obtenemos el elemento real desde la referencia
    const element = imageRef.current;

    if (!element) return; // Seguridad: si no hay imagen, no hacemos nada

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      // Soporte para Safari y versiones antiguas de Chrome/Edge
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // Soporte para Internet Explorer/Edge antiguo
      element.msRequestFullscreen();
    }
  };

  if (!obra) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Navegación */}
        <button className="modal-nav-button prev" onClick={() => onNavigate(-1)}>&lt;</button>
        <button className="modal-nav-button next" onClick={() => onNavigate(1)}>&gt;</button>
        <button className="modal-close-button" onClick={onClose}>&times;</button>

        <div className="modal-body-flex">
          {/* Descripción */}
          <div className="modal-descripcion-wrapper">
            <h3 className="modal-titulo-grande">{obra.titulo}</h3>
            <p className="modal-descripcion-texto">{obra.descripcion}</p> 
            
            {/* Botón de expansión para el usuario */}
            <button className="expand-btn" onClick={verPantallaCompleta}>
              Ver a tamaño completo ⛶
            </button>
          </div>

          {/* Imagen con Ref y Zoom */}
          <div className="modal-imagen-wrapper">
            <img 
              ref={imageRef}
              src={obra.imagenSrc} 
              alt={obra.titulo} 
              className="modal-imagen-principal interactive-img"
              key={obra.id}
              onClick={verPantallaCompleta} // También abre pantalla completa al hacer clic
              title="Haz clic para expandir"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;