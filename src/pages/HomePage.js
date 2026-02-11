import React, { useEffect } from 'react'; // Añadimos useEffect
import { useFirestore } from '../hooks/useFirestore';

// COMPONENTES
import { Header } from '../components/organisms/Header'; 
import OcPrincipal from '../components/organisms/Oc_Principal';
import OcIntro from '../components/organisms/OcIntro';
import GaleriaArte from '../components/organisms/GaleriaArte';

// ASSETS
import brixoi from '../assets/images/arte/Brixoioi.jpg';
import Brighella from '../assets/images/arte/Brighella.jpg';
import Brir from '../assets/images/arte/Brir.jpg'; 
import './HomePage.css';

const HomePage = () => {
    const { docs: datosDeFirebase, cargando } = useFirestore('obras');
    const galeria = datosDeFirebase || [];

    // Lógica de Filtrado

    const Galery = galeria.filter(obra => 
        obra.categorias && obra.categorias.includes('Galery')
    );


    // =========================================================================
    // EFECTO DE REVELACIÓN (SCROLL REVEAL) - Nivel 2026
    // =========================================================================
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15 // Se activa cuando el 15% del elemento es visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, observerOptions);

        // Seleccionamos todas las secciones con la clase 'reveal'
        const sections = document.querySelectorAll('.reveal');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, [cargando]); // Se re-ejecuta cuando termina de cargar los datos

    if (cargando) {
        return (
            <div className="home-loading">
                <div className="loader-portal"></div>
                <p>Cargando el arte desde el Éter...</p>
            </div>
        );
    }

    return (
        <div className="home-page-layout">
            {/* Fondo Atmosférico de partículas/luces (opcional añadir div extra) */}
            <div className="atmospheric-layers"></div>

            <Header paginaActiva="HOME" /> 
            
            <main className="page-content"> 
                
                {/* INTRODUCCIÓN */}
                <section id="home" className="seccion-pantalla-completa anchor-section">
                    <OcIntro />
                </section>
                
                {/* OC PRINCIPAL - Con clase reveal */}
                <section id="personal" className="seccion-pantalla-completa anchor-section reveal">
                    <OcPrincipal 
                        titulo="Selene"
                        nombreCodigo="Brighella"
                        descripcion="Bri es uno de mis actuales Ocs favoritos. Es un personaje con una historia profunda y un diseño visual que refleja su personalidad algo compleja. 
                        La cual ha vivido diversas experiencias que la han moldeado en quien es hoy. El estaria destinadx mas que un aprendiz el cual durante mucho tiempo fue tratado como alguien que no tiene cierta sensacion de pureza lo cual lo hizo sentir alguien incompetente y fue mal visto, sintiendo que sus esfuerzos fueron para nada, tras este acontecimiento Calypso que estuvo a su lado ese periodo, 
                        le enseño un cierto metodo pero requeria cierto sacricio, el cual siendo un angel podria perder su esencia pura... pero tenia un alto costo.."
                        clase="Ángel Caído"
                        habilidades={['May the light guide you', 'Even angels can play tricks!', 'Miracles are real']} 
                        imagenSrc={Brighella}
                        imagenSrc2={Brir}
                        altImagen="Retrato principal de Bri"
                    />
                </section> 

                <div className="seccion-contenido-fluido">
                    
                    {/* GALERÍA 1 - Con clase reveal */}
                    <section id="ecos-del-mundo-ancla" className="anchor-section reveal">  
                        <GaleriaArte 
                            obras={Galery} 
                            titulo="Ecos del Mundo" 
                            descripcion="Fragmentos visuales de realidades alternas..."
                        />
                    </section>

                    {/* GALERÍA 2 - Con clase reveal
                    <section id="other" className="anchor-section reveal">
                        <GaleriaArte
                            obras={Galery} 
                            titulo="Galery" 
                        />
                    </section> */}
                    
                    <hr className="reveal" />
                    
                    {/* SOBRE MÍ */}
                    <section id="about" className="about-me-snippet anchor-section reveal">
                        <div className="about-left">
                            <h2>Sobre Mí</h2>
                            <p>Soy Aponia_, un artista apasionada...</p>
                            <a className="about-link" href="#/about-me">Leer más sobre mí...</a>
                        </div>
                        <div className="about-right">
                            <img src={brixoi} alt="Avatar" className="floating-avatar" />
                        </div>
                    </section>
                    
                    {/* CONTACTO */}
                    <section className="contact-cta reveal">
                        <h2>¿Interesado en una comisión?</h2>
                        <p>Disponible para trabajos.</p>
                        <a className="contact-btn" href="#/contact">Contactar Ahora</a>
                    </section>

                    <footer className="site-footer">
                        <p>© {new Date().getFullYear()} Erii Art Web. Todos los derechos reservados.</p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default HomePage;