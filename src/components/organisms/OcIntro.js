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
      // La imagen la manejaremos en el siguiente paso, por ahora usemos una fija o del config
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${config.ocImagenUrl || 'TU_IMAGEN_POR_DEFECTO'})` }}
    >
      <div className="Oc-intro-content">
        <h1 className="Oc-intro-titulo">
          {config.ocTitulo || "Sueños y futuro"} 
        </h1>
        <p className="Oc-intro-subtitulo">
          {config.ocSubtitulo || "Bienvenido a mi mundo artístico."}
        </p>
        
        <Boton 
          texto="Comienza la aventura"
          onClick={handleScrollToOC}
          variante="primario" 
        />
      </div>
    </section>
  );
};

export default OcIntro;