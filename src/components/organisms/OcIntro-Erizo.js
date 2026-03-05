import React from 'react';
import Boton from '../atoms/boton'; 
import { useConfig } from '../../hooks/useConfig'; // CAMBIO: Usamos el hook
import './OcIntro.css';

const OcIntro = () => {
  const { config, loading } = useConfig();

  const handleScrollToOC = () => {
    const targetElement = document.getElementById('oc-principal-ancla');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (loading) return null; // O un spinner

  return (
  <section 
    className="Oc-intro-contenedor"
    style={{ backgroundImage: `url(${config.ocImagenUrl})` }}
  >
    <div className="Oc-overlay"> {/* <-- ESTE ES EL SECRETO */}
      <h1 className="Oc-intro-titulo">{config.ocTitulo}</h1>
      <p className="Oc-intro-subtitulo">{config.ocSubtitulo}</p>
      <Boton texto="Ver Galería" onClick={handleScrollToOC} variante="primario" />
    </div>
  </section>
);
};

export default OcIntro;