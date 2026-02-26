import React from 'react';
import './PreciosComisiones.css';
import { artistaConfig } from '../../config/artistaConfig'; // Ajusta la ruta según tu carpeta

const PreciosComisiones = () => {
    // Ya no definimos 'servicios' aquí, los traemos del config
    const { servicios } = artistaConfig;

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
                        <button className="btn-ordenar">
                            Solicitar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreciosComisiones;