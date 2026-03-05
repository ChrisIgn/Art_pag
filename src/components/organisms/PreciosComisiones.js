import React from 'react';
import './PreciosComisiones.css';
import { useFirestore } from '../../hooks/useFirestore'; // Importamos tu hook

const PreciosComisiones = () => {
    // Traemos los servicios desde la colección 'servicios' de Firebase
    const { docs: servicios } = useFirestore('servicios');

    // Mostramos un mensaje simple mientras cargan los datos desde el Éter
    if (!servicios) return <div className="precios-loading">Cargando tarifas...</div>;

    return (
        <div className="precios-container">
            <h2 className="precios-titulo">Tarifas de Comisión</h2>
            <div className="precios-grid">
                {/* Ahora iteramos sobre los documentos de Firebase */}
                {servicios.map((s) => (
                    <div key={s.id} className={`precio-card ${s.destacado ? 'card-pro' : ''}`}>
                        {s.destacado && <span className="badge-popular">Más pedido</span>}
                        
                        <h3>{s.tipo}</h3>
                        <div className="monto">{s.precio}</div>
                        <p className="descripcion">{s.descripcion}</p>
                        
                        <ul className="lista-incluye">
                            {/* Verificamos que 'incluye' exista antes de hacer map */}
                            {s.incluye && s.incluye.map((item, i) => (
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