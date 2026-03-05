// src/config/artistaConfig.js
export const artistaConfig = {
    nombre: "Eri",
    profesion: "Ilustradora/o Digital/ Concept Artist",
    emailContacto: "eriiartweb@gmail.com",

// CONFIGURACIÓN DE LA ESTÉTICA (UI/UX)
    // Cambia estos códigos para cambiar el "vibe" de toda la web al instante
    estetica: {
        primario: "#4A90E2",    // Azul principal (Brillos, botones)
        fondo: "#0a0b10",      // Fondo oscuro profundo
        tarjeta: "rgba(255, 255, 255, 0.05)", // Glassmorphism
        texto: "#ffffff",
        acento: "#ff7eb9"      // Para detalles especiales o avisos
    },


// SECCIÓN HERO (Lo primero que ven al entrar)
    hero: {
        titulo: "Sueños y Futuro",
        subtitulo: "Explora una línea de tiempo donde las imaginaciones lejanas se vuelven realidad. Bienvenido al mundo de BrigHella.",
        botonPrincipal: "Comienza la aventura",
        // OPCIÓN A: Una imagen de stock profesional de Unsplash (Cyberpunk/Futurista)
        imagenFondo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop",
        // OPCIÓN B: Si prefieres usar una imagen local que SÍ sea tuya:
        // imagenFondo: require('../../assets/images/arte/NuevaImagen.jpg')
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
            precio: "Desde $27",
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