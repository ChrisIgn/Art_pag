import React from 'react';
import Boton from '../atoms/boton'; // Reutilizaremos el botón
import './OcIntro.css';
import brix1 from '../../assets/images/arte/Brix1.jpg';
// Este componente no necesita props, ya que su contenido es estático
const OcIntro = () => {

  const handleScrollToOC = () => {
    // 1. Obtenemos el elemento por su ID
    const targetElement = document.getElementById('oc-principal-ancla');
    
    // 2. Si el elemento existe, aplicamos el scroll suave
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth' // CLAVE: Hace la animación suave
      });
    }
  }

  return (
    <section 
     className="Oc-intro-contenedor"
     style={{ backgroundImage: `url(${brix1})` }}
    >
      <h1 className="Oc-intro-titulo">
        Sueños y futuro
      </h1>
      <p className="Oc-intro-subtitulo">
        Explora una línea de tiempo donde las imaginaciones lejanas se vuelven realidad. 
        Bienvenido al mundo de BrigHella.
      </p>
      
      {/* Usamos el texto de botón mejorado */}
      <Boton 
        texto="Comienza la aventura"
        onClick={handleScrollToOC}
        variante="primario" // O una nueva variante si quieres un estilo especial
      />
    </section>
  );
};

export default OcIntro;