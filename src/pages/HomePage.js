import React, { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { createPortal } from 'react-dom';

// COMPONENTES
import { Header } from '../components/organisms/Header'; 
import OcPrincipal from '../components/organisms/Oc_Principal';
import OcIntro from '../components/organisms/OcIntro';
import GaleriaArte from '../components/organisms/GaleriaArte';
import ContactoForm from '../components/ContactoForm';
import PreciosComisiones from '../components/organisms/PreciosComisiones';
import SocialLinks from '../components/molecules/SocialLinks';

// ASSETS
import brixoi from '../assets/images/arte/Brixoioi.jpg';
import { useConfig } from '../hooks/useConfig';
import './HomePage.css';

const HomePage = () => {
    const { config } = useConfig();
    
    // 1. Traemos la galería (Y usamos sus imágenes de respaldo por si el OC no tiene foto)
    const { docs: datosDeFirebase, cargando: cargandoObras } = useFirestore('obras');
    const galeria = datosDeFirebase || [];
    const imgBriPura = galeria.find(img => img.tipo === 'oc_pure')?.imagenSrc; 
    const imgBriCaida = galeria.find(img => img.tipo === 'oc_fallen')?.imagenSrc;

    // 2. NUEVO: Traemos la colección completa de tus personajes
    const { docs: listaOcs, cargando: cargandoOcs } = useFirestore('personajes');

    // 3. ESTADOS DE LA PÁGINA
    const [isFallenWorld, setIsFallenWorld] = useState(false);
    const [mostrarContacto, setMostrarContacto] = useState(false);
    const [indiceOcActual, setIndiceOcActual] = useState(0); // Controla qué OC se muestra

    // =========================================================================
    // EFECTO DE REVELACIÓN (SCROLL REVEAL)
    // =========================================================================
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15 
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('.reveal');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, [cargandoObras, cargandoOcs]); // Recalcula si cambia el estado de carga


    // =========================================================================
    // MANEJO DE CARGA INICIAL
    // =========================================================================
    if (cargandoObras || cargandoOcs) {
        return (
            <div className="home-loading">
                <div className="loader-portal"></div>
                <p>Cargando el arte desde el Éter...</p>
            </div>
        );
    }

    // =========================================================================
    // LÓGICA DEL CARRUSEL DE PERSONAJES
    // =========================================================================
    const ocActual = listaOcs && listaOcs.length > 0 ? listaOcs[indiceOcActual] : null;

    const cambiarOcAnterior = () => {
        setIsFallenWorld(false); // Al cambiar, siempre vuelve a la fase Pura
        setIndiceOcActual((prev) => (prev === 0 ? listaOcs.length - 1 : prev - 1));
    };

    const cambiarOcSiguiente = () => {
        setIsFallenWorld(false); // Al cambiar, siempre vuelve a la fase Pura
        setIndiceOcActual((prev) => (prev === listaOcs.length - 1 ? 0 : prev + 1));
    };

    // =========================================================================
    // RENDERIZADO PRINCIPAL
    // =========================================================================
    return (
        <div className={`home-page-layout ${isFallenWorld ? 'global-fallen' : 'global-pure'}`}>
            
            <div className="atmospheric-layers"></div>
            <Header paginaActiva="HOME" /> 
            
            <main className="page-content"> 
                
                {/* 1. INTRODUCCIÓN */}
                <section id="home" className="seccion-pantalla-completa anchor-section">
                    <OcIntro />
                </section>
                
                {/* 2. CARRUSEL DE OCS PRINCIPALES */}
                <section id="personal" className="seccion-pantalla-completa anchor-section reveal">
                    {ocActual ? (
                        <div className="carrusel-oc-container">
                            
                            {/* BOTÓN IZQUIERDO */}
                            {listaOcs.length > 1 && (
                                <button className="btn-carrusel prev" onClick={cambiarOcAnterior}>
                                    &#10094;
                                </button>
                            )}

                            {/* TARJETA DEL PERSONAJE */}
                            <OcPrincipal 
                                titulo={ocActual.titulo}
                                nombreCodigo={ocActual.nombreCodigo}
                                descripcion={ocActual.descripcion}
                                clase={ocActual.clase}
                                habilidades={ocActual.habilidades} 
                                /* Si el OC tiene imagen en Firebase la usa, si no, usa la por defecto */
                                imagenSrc={ocActual.imgPuraUrl || imgBriPura}   
                                imagenSrc2={ocActual.imgCaidaUrl || imgBriCaida} 
                                altImagen={`Retrato de ${ocActual.titulo}`}
                                onPhaseChange={(fallen) => setIsFallenWorld(fallen)}
                            />

                            {/* BOTÓN DERECHO */}
                            {listaOcs.length > 1 && (
                                <button className="btn-carrusel next" onClick={cambiarOcSiguiente}>
                                    &#10095;
                                </button>
                            )}
                            
                        </div>
                    ) : (
                        <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
                            <p>Aún no hay personajes en el Éter. ¡Añádelos desde el Admin!</p>
                        </div>
                    )}
                </section>
            
                <div className="seccion-contenido-fluido">
                    
                    {/* 3. GALERÍA INTELIGENTE */}
                    <section id="ecos-del-mundo-ancla" className="anchor-section reveal">  
                        <GaleriaArte 
                            obras={galeria} 
                            titulo="Ecos del Mundo" 
                            descripcion="Fragmentos visuales de realidades alternas. Filtra por categoría para explorar."
                        />
                    </section>

                    <hr className="reveal" />
                    
                    {/* 4. SOBRE MÍ */}
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
                    
                    {/* 5. CONTACTO */}
                    <section id="precios" className="reveal">
                        <PreciosComisiones />
                    </section>
                    
                    <section className="contact-cta reveal">
                        <h2>¿Interesado en una comisión?</h2>
                        <p>Disponible para nuevos proyectos y colaboraciones.</p>
                        <button 
                            disabled={!config.comisionesAbiertas}
                            className={`btn-contact ${config.comisionesAbiertas ? 'open' : 'closed'}`}
                            onClick={() => setMostrarContacto(true)}    
                        >
                            {config.comisionesAbiertas ? "✨ Solicitar Comisión" : "⏳ Agenda Llena"}
                        </button>
                    </section>
                    
                    <footer className="site-footer">
                        <div className="footer-content reveal">
                            <SocialLinks />
                            <div className="footer-info">
                                <p>© {new Date().getFullYear()} Erii Art Web. Todos los derechos reservados.</p>
                                <p className="admin-access">
                                    Erii Art Web
                                    <a href="/admin" className="secret-dot"> .</a>
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>

            {/* MODAL DE CONTACTO */}
            {mostrarContacto && createPortal(
                <div className="modal-overlay" onClick={() => setMostrarContacto(false)}>
                    <div className="modal-content contact-modal-size" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-button" onClick={() => setMostrarContacto(false)}>
                            &times;
                        </button>
                        <h2 className="galeria-titulo" style={{fontSize: '2rem', textAlign: 'center'}}>Enviar Mensaje</h2>
                        
                        <ContactoForm />
            
                        <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9BA9B8', marginBottom: '15px' }}>
                                O encuéntrame en mis redes:
                            </p>
                            <SocialLinks />
                        </div>
                    </div>
                </div>,
                document.body
            )}
            
        </div>
    );
};

export default HomePage;