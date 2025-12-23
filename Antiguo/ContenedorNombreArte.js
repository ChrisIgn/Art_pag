import React, { useState } from 'react';
import Boton from '../src/components/atoms/boton';         // Átomo
import ListaArte from '../src/components/molecules/ListaArte'; // Molécula
// Nota: La variable 'art' (el array) sigue aquí por ahora, ya que es la prueba

export const ContenedorNombreArte = () => {
    let web = "arteweb.com"; 
    const [nombre, setnombre] = useState("Victor"); 

    let art = [ // Array de datos (simulando datos de una API)
      "Dibujos", "Estilos de arte", "Arte digital", "About me", "Contact"
    ];

    const cambiarNombre = (nuevoNombre) => { 
      setnombre(nuevoNombre);
    }

  return (
    <section> {/* Usar una etiqueta semántica como section */}
        <h1>Hola Mundo desde mi componente</h1>
        <p>Mi nombre es: <strong className={nombre.length >= 4 ? 'verde' : 'rojo' }>{nombre}</strong> </p>
        <p>Mi web es: {web}</p>

        {/* 1. Input para cambiar el estado */}
        <input 
            type="text" 
            onChange={e => cambiarNombre(e.target.value)} 
            placeholder='cambia el nombre'
        />

        <Boton 
            texto="Valor del estado actual"
            onClick={() => console.log("Estado actual:", nombre)}
            variante="secundario" 
        />
        <Boton 
            texto="Cambiar Nombre Fijo"
            onClick={() => cambiarNombre("VICTOR ROBLES WEB")}
            variante="primario" 
        />
        
        <hr />

        {/* 3. Molécula que renderiza la lista de arte */}
        <ListaArte art={art} />
    </section>
  )
}