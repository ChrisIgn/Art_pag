import React from 'react';

// =========================================================================
// 1. IMPORTS
// =========================================================================
import { Header } from '../components/organisms/Header'; 
import OcPrincipal from '../components/organisms/Oc_Principal';
import OcIntro from '../components/organisms/OcIntro';
import GaleriaArte from '../components/organisms/GaleriaArte';

// =========================================================================
// 2. IMPORTS DE ASSETS
// =========================================================================
import oioioiImage from '../assets/images/arte/oioioi.jpg'; 
import brixoi from '../assets/images/arte/Brixoioi.jpg';
import Brix1 from '../assets/images/arte/Brix1.jpg';
import Brighella from '../assets/images/arte/Brighella.jpg';
import days1x100 from '../assets/images/arte/100days1xbri.jpg';
import Brix1kiss from '../assets/images/arte/1xbrikiss.jpg';
import Brix1Omg from '../assets/images/arte/Brix1xOMG.jpg';
//Segunda dfase
import Brir from '../assets/images/arte/Brir.png';



const HomePage = () => {

    // =========================================================================
    // 3. LÓGICA Y DATOS
    // =========================================================================

    const datosGaleriaCompletos = [
        { 
            id: 'g1', titulo: 'Oioi', imagenSrc: oioioiImage, categoria: ['Oioi', 'Galery'],
            descripcion: 'Oioi es una obra que experimenta con el color y la forma abstracta para representar un estado emocional caótico pero controlado. Esta pieza busca evocar una sensación de movimiento perpetuo.'
        },
        { 
            id: 'g2', titulo: 'a', imagenSrc: Brighella, categoria: ['Bri', 'Galery'],
            descripcion: 'a'
        },
        { 
            id: 'g3', titulo: 'Who are you exactly?', imagenSrc: brixoi, categoria: ['Bri', 'Galery'],
            descripcion: 'Who are you exactly?'
        },
        { 
            id: 'g4', titulo: 'Llanura', imagenSrc: Brix1, categoria: ['Bri', 'Galery'],
            descripcion: 'No matter what happens or how much you can hurt me, I wont let you down. Thats my most and unique sincere promise I never did.'
        },
        { 
            id: 'g5', titulo: '100days<3', imagenSrc: days1x100, categoria: ['Bri', 'Galery'],
            descripcion: 'Celebration'
        },
        { 
            id: 'g6', titulo: '1xbrikiss<3', imagenSrc: Brix1kiss, categoria: ['Bri', 'Galery'],
            descripcion: 'Kiss'
        },
        { 
            id: 'g6', titulo: '1xbri<3', imagenSrc: Brix1Omg, categoria: ['Bri', 'Galery'],
            descripcion: 'Kiss'
        },
    ];

    const obrasPersonalStyle = datosGaleriaCompletos.filter(obra => obra.categoria.includes('Bri'));
    const obrasOtherStyles = datosGaleriaCompletos.filter(obra => obra.categoria.includes('Galery'));


    // =========================================================================
    // 4. RENDERIZADO (JSX)
    // =========================================================================

    return (
        <div className="home-page-layout">
            
            {/* El Header suele ir fijo (sticky) o al inicio */}
            <Header paginaActiva="HOME" /> 
            
            <main className="page-content"> 
                
                {/* BLOQUE 1: INTRODUCCIÓN 
                    La envolvemos en una section para que el scroll snap sepa dónde aterrizar.
                */}
                <section className="seccion-pantalla-completa">
                    <OcIntro />
                </section>

                {/* BLOQUE 2: OC PRINCIPAL (Destino del botón "Comenzar")
                    Ya tiene el ID para el botón, le agregamos la clase para el snap.
                */}
                <section id="oc-principal-ancla" className="seccion-pantalla-completa">
                    <OcPrincipal 
                        titulo="Selene"
                        nombreCodigo="Brighella"
                        descripcion="Bri es uno de mis actuales Ocs favoritos. Es un personaje con una historia profunda y un diseño visual que refleja su personalidad algo compleja. 
                        La cual ha vivido diversas experiencias que la han moldeado en quien es hoy. El estaria destinadx mas que un aprendiz el cual durante mucho tiempo fue tratado como alguien que no tiene cierta sensacion de pureza lo cual lo hizo sentir alguien incompetente y fue mal visto, sintiendo que sus esfuerzos fueron para nada, tras este acontecimiento Calypso que estuvo a su lado ese periodo, 
                        le enseño un cierto metodo pero requeria cierto sacricio, el cual siendo un angel podria perder su esencia pura... pero tenia un alto costo.."
                        clase="Ángel Caído "
                        habilidades={['May the light guide you', 'Even angels can play tricks!', 'Miracles are real']} 
        // ------------------------------
                        imagenSrc={Brighella}
                        imagenSrc2={Brir}
                        altImagen="Retrato principal de Bri, mi OC"
                    />
                </section>

                {/* BLOQUE 3: CONTENIDO FLUIDO (Galerías y Texto)
                    A partir de aquí, dejamos que el usuario haga scroll normal o 
                    creamos secciones "suaves".
                    
                    Nota: No forzamos 'pantalla completa' aquí porque el contenido 
                    puede ser más largo que la pantalla (Galerías largas).
                */}
                <div className="seccion-contenido-fluido">
                    <section id="ecos-del-mundo-ancla"> {
                    <GaleriaArte 
                        obras={obrasPersonalStyle} 
                        titulo="Ecos del Mundo" 
                        descripcion="Fragmentos visuales de realidades alternas. Cada pieza es un eco de una historia que existe en los márgenes de Brighella."
                    />
                    }</section>

                    <GaleriaArte 
                        obras={obrasOtherStyles} 
                        titulo="Galería: Galery" 
                    />
                    
                    <hr />
                    
                    <section className="about-me-snippet" style={{ display: 'flex', alignItems: 'center', gap: '40px', padding: '60px 20px', backgroundColor: '#f9f9f9' }}>
                        <div style={{ flex: 1, textAlign: 'left' }}>
                            <h2 style={{ fontSize: '2.5em' }}>Sobre Mí</h2>
                            <p style={{ fontSize: '1.1em', color: '#555', lineHeight: 1.6, margin: '20px 0' }}>
                                Soy Aponia_, un artista apasionada... 
                            </p> 
                            <a href="#/about-me" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Leer más sobre mí...</a>
                        </div>
                        <div style={{ flex: 1 }}>
                            <img src={brixoi} alt="Avatar" style={{ width: '100%', borderRadius: '8px' }} />
                        </div>
                    </section>
                    
                    <section className="contact-cta" style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#282c34', color: 'white' }}>
                        <h2 style={{ fontSize: '2.5em' }}>¿Interesado en una comisión?</h2>
                        <p style={{ fontSize: '1.2em', margin: '20px 0 30px' }}>Disponible para trabajos.</p>
                        <a href="#/contact" style={{ padding: '15px 30px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                            Contactar Ahora
                        </a>
                    </section>

                    <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid #ddd', marginTop: '50px' }}>
                        <p>© {new Date().getFullYear()} Erii Art Web. Todos los derechos reservados.</p>
                    </footer>
                </div>

            </main>
        </div>
    );
};

export default HomePage;