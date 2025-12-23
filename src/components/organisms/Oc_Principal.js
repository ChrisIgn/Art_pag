import React, { useState } from 'react';
// Asegúrate de importar el archivo CSS correcto:
// import './HeroPrincipal.css'; // Si renombraste el CSS
import './oc.css'; // Usaré este nombre para el CSS


const OcPrincipal = ({ titulo, nombreCodigo, clase, habilidades, descripcion, imagenSrc, imagenSrc2, altImagen }) => {
  // 1. ESTADO: Por defecto, comenzamos en la Fase Uno (true)
    const [isPhaseOne, setIsPhaseOne] = useState(true);

    // 2. MANEJADOR: Función que cambia el estado al hacer clic
    const handleImageClick = () => {
        setIsPhaseOne(!isPhaseOne); // Esto alterna entre true y false
    };
    

    // 5. FUENTE: Elige la imagen a mostrar
    const currentImageSrc = isPhaseOne ? imagenSrc : imagenSrc2;
    const phaseText = isPhaseOne ? "Oc" : "OcForsaken";

    // FUNCIÓN DE SCROLL: Busca el ID y aplica el scroll suave
    const handleScrollToGallery = () => {
        const targetElement = document.getElementById('ecos-del-mundo-ancla');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };


  return (
    <div className="hero-principal-contenedor">
        
        {/* COLUMNA 1 (IZQUIERDA): Imagen - Añadir onClick */}
        <div className="hero-imagen-wrapper" onClick={handleImageClick}>
            <img 
                src={currentImageSrc} 
                alt={altImagen + " (" + phaseText + ")"} 
                className="hero-imagen-oc" 
            />
        </div>

        {/* COLUMNA 2 (DERECHA): Texto y Datos */}
      {/* COLUMNA 2 (DERECHA): Texto y Datos */}
            <div className="hero-contenido-wrapper">
                {/* Puedes mostrar qué fase se está viendo */}
                <h2 className="oc-nombre-titulo">{titulo} ({phaseText})</h2>
            
            {/* NUEVO: Muestra el nombre en código solo si existe */}
            {nombreCodigo && <p className="oc-nombre-codigo">"{nombreCodigo}"</p>} 
            
            {/* 1. CLASE */}
            <h3 className="oc-seccion-subtitulo">Clase: <span className="oc-dato-valor">{clase}</span></h3>
            
            {/* 2. HISTORIA / DESCRIPCIÓN */}
            <h3 className="oc-seccion-subtitulo">Historia</h3>
            <p className="oc-descripcion-texto">{descripcion}</p>
            
            {/* 3. HABILIDADES */}
            <h3 className="oc-seccion-subtitulo">Habilidades</h3>
            <ul className="oc-habilidades-lista">
                {habilidades && habilidades.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    {/* NUEVO: Indicador de Scroll hacia abajo */}
      <div className="scroll-down-indicator" onClick={handleScrollToGallery}>
                    <p className="arrow-label">Explora Ecos del Mundo</p> {/* <--- ETIQUETA */}
                    <div className="arrow-icon">
                    {/* Puedes usar un símbolo de flecha unicode o un icono */}
                    &#x25BC; {/* Símbolo de triángulo hacia abajo */}
                </div>
            </div>       
        
    </div>
  );
};

export default OcPrincipal;