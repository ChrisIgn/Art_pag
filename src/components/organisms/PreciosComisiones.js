import React from 'react';
import './PreciosComisiones.css';

const PreciosComisiones = () => {
    const servicios = [
        {
            id: 1,
            tipo: "Headshot / Icon",
            precio: "Desde $25",
            descripcion: "Retrato hasta los hombros, ideal para perfiles sociales.",
            incluye: ["Color base", "Fondo simple", "Alta resolución"],
            imagen: "https://via.placeholder.com/300x300?text=Ejemplo+Icon" // Cambia por tus artes
        },
        {
            id: 2,
            tipo: "Half Body",
            precio: "Desde $45",
            descripcion: "Dibujo de la cintura para arriba. Incluye más detalle.",
            incluye: ["Sombreado completo", "Efectos mágicos", "Archivo PSD"],
            destacado: true // Para que brille más
        },
        {
            id: 3,
            tipo: "Full Body",
            precio: "Desde $70",
            descripcion: "Personaje completo de pies a cabeza con máxima calidad.",
            incluye: ["Renderizado detallado", "Accesorios complejos", "Uso comercial"],
            imagen: "https://via.placeholder.com/300x500?text=Ejemplo+Full+Body"
        }
    ];

    return (
        <div className="precios-container">
            <h2 className="precios-titulo">Tarifas de Comisión</h2>
            <div className="precios-grid">
                {servicios.map((s) => (
                    <div key={s.id} className={`precio-card ${s.destacado ? 'card-pro' : ''}`}>
                        {s.destacado && <span className="badge-popular">Más pedido</span>}
                        <h3>{s.tipo}</h3>
                        <div className="monto">{s.precio}</div>
                        <p className="descripcion">{s.descripcion}</p>
                        <ul className="lista-incluye">
                            {s.incluye.map((item, i) => (
                                <li key={i}>✨ {item}</li>
                            ))}
                        </ul>
                        <button className="btn-ordenar" onClick={() => {
                            document.querySelector('.contact-btn').click(); // Abre el modal de contacto
                        }}>
                            Solicitar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreciosComisiones;