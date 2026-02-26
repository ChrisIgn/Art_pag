// src/config/artistaConfig.js
export const artistaConfig = {
    nombre: "Eri",
    profesion: "Ilustradora/o Digital/ Concept Artist",
    emailContacto: "eriiartweb@gmail.com",

    //Configuracion de la estetica
    colores: {
         principal: "#4A90E2",
         secundario: "#f3f4f6",
         acento: "#ff7eb9"
    },

    // Redes sociales
    redes: {
        instagram: "https://www.instagram.com/erii_art/",
        twitter: "https://twitter.com/erii_art",
        facebook: "https://www.facebook.com/eriiartweb",
        artstation: "https://www.artstation.com/erii_art"
    },

    //Configuracion de negocio
    servicios: [
        {
            id: 1,
            tipo: "Headshot / Icon",
            precio: "Desde $25",
            descripcion: "Retrato hasta los hombros, ideal para perfiles sociales.",
            incluye: ["Color base", "Fondo simple", "Alta resolución"],
        },
        {
            id: 2,
            tipo: "Half Body",
            precio: "Desde $45",
            descripcion: "Dibujo de la cintura para arriba. Incluye más detalle.",
            incluye: ["Sombreado completo", "Efectos mágicos", "Archivo PSD"],
            destacado: true 
        },
        {
            id: 3,
            tipo: "Full Body",
            precio: "Desde $70",
            descripcion: "Personaje completo de pies a cabeza con máxima calidad.",
            incluye: ["Renderizado detallado", "Accesorios complejos", "Uso comercial"],
        }
    ],
    
    comisionesAbiertas: true, //Este sera un interruptor a ocupar
    moneda: "USD"
};