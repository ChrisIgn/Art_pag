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
            <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A122A', color: 'white', fontSize: '1.5em'}}>
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
                <section className="seccion-pantalla-completa">
                    <OcIntro />
                </section>
                
                {/* 2. BLOQUE OC PRINCIPAL (Scroll Snap Point 2) */}
                <section id="oc-principal-ancla" className="seccion-pantalla-completa">
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
                    <GaleriaArte
                        obras={obrasOtherStyles} 
                        titulo="Galery" 
                    />
                    
                    <hr />
                    
                    {/* SECCIÓN 5: SOBRE MÍ (Snippet) */}
                    <section className="about-me-snippet" style={{ display: 'flex', alignItems: 'center', gap: '40px', padding: '60px 20px', backgroundColor: '#f9f9f9' }} >
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
                    
                    {/* SECCIÓN 6: LLAMADA A LA ACCIÓN (Contacto) */}
                    <section className="contact-cta" style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#282c34', color: 'white' }}>
                        <h2 style={{ fontSize: '2.5em' }}>¿Interesado en una comisión?</h2>
                        <p style={{ fontSize: '1.2em', margin: '20px 0 30px' }}>Disponible para trabajos.</p>
                        <a href="#/contact" style={{ padding: '15px 30px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                            Contactar Ahora
                        </a>
                    </section>

                    {/* FOOTER */}
                    <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid #ddd', marginTop: '50px' }}>
                        <p>© {new Date().getFullYear()} Erii Art Web. Todos los derechos reservados.</p>
                    </footer>
                </div>

            </main>
        </div>
    );
};

export default HomePage;