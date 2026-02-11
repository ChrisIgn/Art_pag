import React, { useState } from 'react';
import './oc.css';

const OcPrincipal = ({ titulo, nombreCodigo, clase, habilidades, descripcion, imagenSrc, imagenSrc2, altImagen }) => {
    const [isPhaseOne, setIsPhaseOne] = useState(true);

    const handleImageClick = () => {
        setIsPhaseOne(!isPhaseOne);
    };

    const handleScrollToGallery = () => {
        const targetElement = document.getElementById('ecos-del-mundo-ancla');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Nombres de fase para el lore
    const phaseLabel = isPhaseOne ? "ESENCIA PURA" : "ESENCIA CORRUPTA";
    const phaseClass = isPhaseOne ? "phase-pure" : "phase-fallen";

    return (
        <div className={`oc-contenedor ${phaseClass}`}>
            
            {/* COLUMNA 1: IMAGEN CON EFECTO DE CAMBIO */}
            <div className="oc-wrapper" onClick={handleImageClick}>
                <div className="image-stack">
                    <img 
                        src={imagenSrc} 
                        alt={altImagen} 
                        className={`ocimagen-oc ${isPhaseOne ? 'visible' : 'hidden'}`} 
                    />
                    <img 
                        src={imagenSrc2} 
                        alt={altImagen + " Forsaken"} 
                        className={`ocimagen-oc ${!isPhaseOne ? 'visible' : 'hidden'}`} 
                    />
                </div>
                <div className="click-hint">Haz clic para transformar</div>
            </div>

            {/* COLUMNA 2: CONTENIDO */}
            <div className="oc-contenido-wrapper">
                <span className="phase-indicator">{phaseLabel}</span>
                <h2 className="oc-nombre-titulo">
                    {isPhaseOne ? titulo : nombreCodigo || titulo}
                </h2>
            
                {isPhaseOne && nombreCodigo && <p className="oc-nombre-codigo">"{nombreCodigo}"</p>} 
                
                <h3 className="oc-seccion-subtitulo">Clase: <span className="oc-dato-valor">{isPhaseOne ? clase : "Ángel Caído"}</span></h3>
                
                <h3 className="oc-seccion-subtitulo">Historia</h3>
                <p className="oc-descripcion-texto">{descripcion}</p>
                
                <h3 className="oc-seccion-subtitulo">Habilidades</h3>
                <ul className="oc-habilidades-lista">
                    {habilidades && habilidades.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>

            {/* INDICADOR DE SCROLL */}
            <div className="scroll-down-indicator" onClick={handleScrollToGallery}>
                <p className="arrow-label">Explora Ecos del Mundo</p>
                <div className="arrow-icon">&#x25BC;</div>
            </div>       
        </div>
    );
};

export default OcPrincipal;