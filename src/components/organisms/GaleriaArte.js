// src/components/organisms/GaleriaArte.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Arteoi from '../molecules/Arte_oi';
import Modal from '../molecules/Modal'; 
import './GaleriaArte.css';
import { createPortal } from 'react-dom';

const GaleriaArte = ({ obras, titulo, descripcion }) => {
  const [filtro, setFiltro] = useState('All'); // Estado para el filtro
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(null);

  // 1. Lógica de filtrado en tiempo real
  const obrasMostradas = filtro === 'All' 
    ? obras 
    : obras.filter(o => o.categorias && o.categorias.includes(filtro));
    
  const abrirModal = (index) => setIndiceSeleccionado(index);
  const cerrarModal = () => setIndiceSeleccionado(null);

  const navegar = useCallback((direccion) => {
    if (indiceSeleccionado === null) return;
    const totalObras = obras.length;
    let nuevoIndice = (indiceSeleccionado + direccion + totalObras) % totalObras;
    setIndiceSeleccionado(nuevoIndice);
  }, [indiceSeleccionado, obras.length]);
  // EFECTO DE TECLADO: Para que se sienta como una App nativa
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (indiceSeleccionado === null) return;
      if (e.key === 'ArrowRight') navegar(1);
      if (e.key === 'ArrowLeft') navegar(-1);
      if (e.key === 'Escape') cerrarModal();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [indiceSeleccionado, navegar]);

  const obraActual = indiceSeleccionado !== null ? obras[indiceSeleccionado] : null;

return (
    <section className="galeria-arte-section reveal">
      <div className="galeria-header">
        <h2 className="galeria-titulo">{titulo}</h2>
        {descripcion && <p className="galeria-subtitulo">{descripcion}</p>}
        
        {/* 2. Botones de Filtro */}
        <div className="galeria-filtros">
          {['All', 'Bri', 'Galery'].map(cat => (
            <button 
              key={cat} 
              className={`btn-filtro ${filtro === cat ? 'activo' : ''}`}
              onClick={() => setFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="galeria-grid-contenedor">
        {/* 3. Usamos 'obrasMostradas' en lugar de 'obras' */}
        {obrasMostradas.map((obra, index) => (
          <div key={obra.id} className="obra-item-wrapper animate-fade">
             <Arteoi 
                imagenSrc={obra.imagenSrc} 
                titulo={obra.titulo} 
                onClick={() => abrirModal(index)} 
              />
          </div>
        ))}
      </div>
      {/* 2. Teletransportar el Modal fuera del flujo del transform */}
      {indiceSeleccionado !== null && createPortal(
        <Modal 
          obra={obraActual} 
          onClose={cerrarModal} 
          onNavigate={navegar}
          total={obras.length}
          actual={indiceSeleccionado + 1}
        />,
        document.body 
      )}  
      {/* El Modal/Lightbox */}
      {indiceSeleccionado !== null && (
        <Modal 
          obra={obraActual} 
          onClose={cerrarModal} 
          onNavigate={navegar}
          total={obras.length}
          actual={indiceSeleccionado + 1}
        />
      )}
    </section>
  );
};

export default GaleriaArte;