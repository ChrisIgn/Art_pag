import React from "react";
import './Tarjeta.css'
import Boton from "../atoms/boton";

export const Tarjeta = ({ titulo, contenido, colorFondo = '#f0f0f0', imagenSrc, imagenAlt, isFeatured }) => {
  
  // 2. Crea una variable para las clases dinámicas.
  const claseDestacada = isFeatured ? 'tarjeta-destacada' : '';
  // 2. NUEVA CLASE para la imagen
  const claseImagen = isFeatured ? 'imagen-destacada' : '';
  return (
    <div className="tarjeta-contenedor" style={{ backgroundColor: colorFondo }}>
      <div 
      className={`tarjeta-contenedor ${claseDestacada}`} 
      style={{ backgroundColor: colorFondo }}
    ></div>

    
      {/* 1. Insertamos la imagen si la prop 'imagenSrc' está presente */}
    
      {imagenSrc && ( // Renderizado condicional: solo muestra la imagen si imagenSrc existe
        <img 
          src={imagenSrc} 
          alt={imagenAlt || `Imagen de ${titulo}`} // Usa imagenAlt o un texto por defecto
          className={`tarjeta-imagen ${claseImagen}`}
        />
      )}
      <div className="tarjeta-cuerpo">
        <h2 className="tarjeta-titulo">{titulo}</h2>
        <p className="tarjeta-contenido">{contenido}</p>

      <Boton 
        texto={`Ver Detalles de ${titulo}`}
        onClick={() => alert(`Abriendo detalles de: ${titulo}`)}
        variante="primario" 
      />
     </div>
      
    </div>
    )
}

export default Tarjeta;