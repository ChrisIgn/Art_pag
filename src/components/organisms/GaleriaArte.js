import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Añadimos useMemo
import Arteoi from '../molecules/Arte_oi';
import Modal from '../molecules/Modal'; 
import './GaleriaArte.css';
import { createPortal } from 'react-dom';

const GaleriaArte = ({ obras, titulo, descripcion }) => {
  const [filtro, setFiltro] = useState('All'); // Estado para el filtro
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(null);

  // =========================================================================
  // LOGICA DINÁMICA DE CATEGORÍAS (Nivel 2026)
  // =========================================================================
  const categoriasDinamicas = useMemo(() => {
    // 1. Extraemos todos los arrays de categorías de todas las obras
    const todasLasCategorias = obras.flatMap(obra => obra.categorias || []);
    
    // 2. Usamos "Set" para eliminar duplicados y creamos el array final
    const unicas = [...new Set(todasLasCategorias)];
    
    // 3. Retornamos 'All' + las categorías encontradas ordenadas alfabéticamente
    return ['All', ...unicas.sort()];
  }, [obras]);

  // Filtrado en tiempo real basado en el estado
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
          
          {/* BOTONES GENERADOS AUTOMÁTICAMENTE */}
          <div className="galeria-filtros">
            {categoriasDinamicas.map(cat => (
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
    </section>
  );
};

export default GaleriaArte;