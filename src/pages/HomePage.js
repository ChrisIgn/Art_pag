import React, { useState, useEffect } from 'react'; // 1. Importamos useState
import { useFirestore } from '../hooks/useFirestore';
import { createPortal } from 'react-dom';

// COMPONENTES
import { Header } from '../components/organisms/Header'; 
import OcPrincipal from '../components/organisms/Oc_Principal';
import OcIntro from '../components/organisms/OcIntro';
import GaleriaArte from '../components/organisms/GaleriaArte';
import ContactoForm from '../components/ContactoForm';
import PreciosComisiones from '../components/organisms/PreciosComisiones';
// ASSETS
import brixoi from '../assets/images/arte/Brixoioi.jpg';
import SocialLinks from '../components/molecules/SocialLinks';

import './HomePage.css';

const HomePage = () => {
    const { docs: datosDeFirebase, cargando } = useFirestore('obras');
    const galeria = datosDeFirebase || [];
    const imgBriPura = galeria.find(img => img.tipo === 'oc_pure')?.imagenSrc; 
    const imgBriCaida = galeria.find(img => img.tipo === 'oc_fallen')?.imagenSrc;
    // 2. Estado para la atmósfera global (Maneja el color de toda la web)
    const [isFallenWorld, setIsFallenWorld] = useState(false);
const [mostrarContacto, setMostrarContacto] = useState(false);
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
    }, [cargando]); 

    if (cargando) {
        return (
            <div className="home-loading">
                <div className="loader-portal"></div>
                <p>Cargando el arte desde el Éter...</p>
            </div>
        );
    }

    return (
        // 3. Aplicamos la clase dinámica aquí para que el CSS cambie el fondo
        <div className={`home-page-layout ${isFallenWorld ? 'global-fallen' : 'global-pure'}`}>
            
            <div className="atmospheric-layers"></div>

            <Header paginaActiva="HOME" /> 
            
            <main className="page-content"> 
                
                {/* 1. INTRODUCCIÓN */}
                <section id="home" className="seccion-pantalla-completa anchor-section">
                    <OcIntro />
                </section>
                
                {/* 2. OC PRINCIPAL - Conectamos la transformación global */}
                <section id="personal" className="seccion-pantalla-completa anchor-section reveal">
                    <OcPrincipal 
                        titulo="Selene"
                        nombreCodigo="Brighella"
                        descripcion="Bri es uno de mis actuales Ocs favoritos. Es un personaje con una historia profunda y un diseño visual que refleja su personalidad algo compleja. 
                        La cual ha vivido diversas experiencias que la han moldeado en quien es hoy. El estaria destinadx mas que un aprendiz el cual durante mucho tiempo fue tratado como alguien que no tiene cierta sensacion de pureza lo cual lo hizo sentir alguien incompetente y fue mal visto, sintiendo que sus esfuerzos fueron para nada, tras este acontecimiento Calypso que estuvo a su lado ese periodo, 
                        le enseño un cierto metodo pero requeria cierto sacricio, el cual siendo un angel podria perder su esencia pura... pero tenia un alto costo.."
                        clase="Ángel Caído"
                        habilidades={['May the light guide you', 'Even angels can play tricks!', 'Miracles are real']} 
                        imagenSrc={imgBriPura}   // Ahora vienen de Firebase!
                        imagenSrc2={imgBriCaida} 
                        altImagen="Retrato principal de Bri"
                        // 4. PASAMOS LA FUNCIÓN AL HIJO
                        onPhaseChange={(fallen) => setIsFallenWorld(fallen)}
                    />
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
                    {/* SECCIÓN DE CONTACTO ACTUALIZADA */}
                    <section id="precios" className="reveal">
                        <PreciosComisiones />
                    </section>
                    <section className="contact-cta reveal">
                        <h2>¿Interesado en una comisión?</h2>
                        <p>Disponible para nuevos proyectos y colaboraciones.</p>
                        
                        {/* El botón ahora abre el modal en lugar de ser un link */}
                        <button className="contact-btn" onClick={() => setMostrarContacto(true)}>
                            Contactar Ahora
                        </button>
                    </section>
                    <footer className="site-footer">
                        <div className="footer-content reveal">
                            <SocialLinks /> {/* <--- Aquí aparecen en el footer */}

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
            
                        {/* --- APARTADO DE REDES SOCIALES --- */}
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