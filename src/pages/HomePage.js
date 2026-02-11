import React from 'react';

// =========================================================================
// 1. IMPORTS DE HOOKS Y FIREBASE
// =========================================================================
import { useFirestore } from '../hooks/useFirestore';

// =========================================================================
// 2. IMPORTS DE COMPONENTES (Organismos/Moléculas)
// =========================================================================
import { Header } from '../components/organisms/Header'; 
import OcPrincipal from '../components/organisms/Oc_Principal';
import OcIntro from '../components/organisms/OcIntro';
import GaleriaArte from '../components/organisms/GaleriaArte';
//import UploadArtworkForm from '../components/UploadArtworkForm';


// =========================================================================
// 3. IMPORTS DE ASSETS (Estáticos)
// =========================================================================
import brixoi from '../assets/images/arte/Brixoioi.jpg';
import Brighella from '../assets/images/arte/Brighella.jpg';
import Brir from '../assets/images/arte/Brir.jpg'; // Segunda fase
import './HomePage.css';


const HomePage = () => {

    // =========================================================================
    // 4. LÓGICA DE DATOS Y ESTADO DE CARGA
    // =========================================================================
    
    // Llamamos a la base de datos para obtener la colección 'obras'
    const { docs: datosDeFirebase, cargando } = useFirestore('obras');

    // Definimos la fuente de datos. Usamos [] si aún no llegan para evitar errores.
    const galeria = datosDeFirebase || [];

    // Lógica de Filtrado
    const obrasPersonalStyle = galeria.filter(obra => 
        obra.categorias && obra.categorias.includes('Bri')
    );
    
    const obrasOtherStyles = galeria.filter(obra => 
        obra.categorias && obra.categorias.includes('Galery')
    );

    // 4.1. ESTADO DE CARGA (Return temprano del componente si está cargando)
    if (cargando) {
        return (
            <div className="home-loading">
                Cargando el arte desde el Éter...
            </div>
        );
    }

    // =========================================================================
    // 5. RENDERIZADO (JSX)
    // =========================================================================

    return (
        <div className="home-page-layout">
            
            {/* CABECERA (Header) */}
            <Header paginaActiva="HOME" /> 
            
            <main className="page-content"> 
                
                {/* 1. BLOQUE INTRODUCCIÓN (Scroll Snap Point 1) */}
                <section id="home" className="seccion-pantalla-completa anchor-section">
                    <OcIntro />
                </section>
                
                {/* 2. BLOQUE OC PRINCIPAL (Scroll Snap Point 2) */}
                <section id="personal" className="seccion-pantalla-completa anchor-section">
                    <OcPrincipal 
                        titulo="Selene"
                        nombreCodigo="Brighella"
                        descripcion="Bri es uno de mis actuales Ocs favoritos. Es un personaje con una historia profunda y un diseño visual que refleja su personalidad algo compleja. 
                        La cual ha vivido diversas experiencias que la han moldeado en quien es hoy. El estaria destinadx mas que un aprendiz el cual durante mucho tiempo fue tratado como alguien que no tiene cierta sensacion de pureza lo cual lo hizo sentir alguien incompetente y fue mal visto, sintiendo que sus esfuerzos fueron para nada, tras este acontecimiento Calypso que estuvo a su lado ese periodo, 
                        le enseño un cierto metodo pero requeria cierto sacricio, el cual siendo un angel podria perder su esencia pura... pero tenia un alto costo.."
                        clase="Ángel Caído "
                        habilidades={['May the light guide you', 'Even angels can play tricks!', 'Miracles are real']} 
                        imagenSrc={Brighella}
                        imagenSrc2={Brir}
                        altImagen="Retrato principal de Bri, mi OC"
                    />
                </section> 

                {/* <section className='seccion-pantalla-completa'> 
                    <UploadArtworkForm/>
                </section>  */}

                {/* 4. CONTENIDO FLUIDO (Galerías y Footer) */}
                <div className="seccion-contenido-fluido">
                    
                    {/* GALERÍA 1: Ecos del Mundo */}
                    <section id="ecos-del-mundo-ancla" className="seccion-pantalla-completa">  
                        <GaleriaArte 
                            obras={obrasPersonalStyle} 
                            titulo="Ecos del Mundo" 
                            descripcion="Fragmentos visuales de realidades alternas. Cada pieza es un eco de una historia que existe en los márgenes de Brighella."
                        />
                    </section>

                    {/* GALERÍA 2: Galery */}
                    <section id="other" className="seccion-pantalla-completa anchor-section">
                        <GaleriaArte
                            obras={obrasOtherStyles} 
                            titulo="Galery" 
                        />
                    </section>
                    
                    <hr />
                    
                    {/* SECCIÓN 5: SOBRE MÍ (Snippet) */}
                    <section id="about" className="about-me-snippet anchor-section">
                        <div className="about-left">
                            <h2>Sobre Mí</h2>
                            <p>
                                Soy Aponia_, un artista apasionada... 
                            </p>
                            <a className="about-link" href="#/about-me">Leer más sobre mí...</a>
                        </div>
                        <div className="about-right">
                            <img src={brixoi} alt="Avatar" />
                        </div>
                    </section>
                    
                    {/* SECCIÓN 6: LLAMADA A LA ACCIÓN (Contacto) */}
                    <section className="contact-cta">
                        <h2>¿Interesado en una comisión?</h2>
                        <p>Disponible para trabajos.</p>
                        <a className="contact-btn" href="#/contact">Contactar Ahora</a>
                    </section>

                    {/* FOOTER */}
                    <footer className="site-footer">
                        <p>© {new Date().getFullYear()} Erii Art Web. Todos los derechos reservados.</p>
                    </footer>
                </div>

            </main>
        </div>
    );
};

export default HomePage;