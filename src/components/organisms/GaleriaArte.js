// src/components/organisms/GaleriaArte.jsx

import React, { useState } from 'react';
import Arteoi from '../molecules/Arte_oi';
import Modal from '../molecules/Modal'; 
import './GaleriaArte.css';

const GaleriaArte = ({ obras, titulo, descripcion}) => {
  
  // 1. Estado para guardar el ÍNDICE de la obra (o null)
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(null);

  // 2. Función para ABRIR el modal (recibe el índice)
  const abrirModal = (index) => {
    setIndiceSeleccionado(index);
  };

  // 3. Función para CERRAR el modal
  const cerrarModal = () => {
    setIndiceSeleccionado(null);
  };

  // 4. Lógica de NAVEGACIÓN
  const navegar = (direccion) => {
    // Solo navega si hay una obra abierta
    if (indiceSeleccionado === null) return;
    
    const totalObras = obras.length;
    let nuevoIndice = indiceSeleccionado + direccion;

    // Lógica de bucle:
    if (nuevoIndice < 0) {
      nuevoIndice = totalObras - 1; // Última foto
    } else if (nuevoIndice >= totalObras) {
      nuevoIndice = 0; // Primera foto
    }

    setIndiceSeleccionado(nuevoIndice);
  };
  
  // La obra que se mostrará se calcula a partir del índice
  const obraActual = indiceSeleccionado !== null ? obras[indiceSeleccionado] : null;

  return (
    <section className="galeria-arte-section">
      
      <h2 className="galeria-titulo">{titulo}</h2>

      {descripcion && <p className="galeria-subtitulo">{descripcion}</p>}

      <div className="galeria-grid-contenedor">
        {obras.map((obra, index) => ( // Mapear usando index
          <Arteoi 
            key={obra.id} 
            imagenSrc={obra.imagenSrc} 
            titulo={obra.titulo} 
            onClick={() => abrirModal(index)} // Pasar el índice al hacer clic
          />
        ))}
      </div>
      
      {/* Renderizamos el Modal con la obra actual y la función de navegación */}
      <Modal 
        obra={obraActual} 
        onClose={cerrarModal} 
        onNavigate={navegar}
      />
      
    </section>
  );
};

export default GaleriaArte;