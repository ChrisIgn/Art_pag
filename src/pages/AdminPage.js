import React, { useState } from 'react'; // Añadimos useState
import UploadArtworkForm from '../components/UploadArtworkForm';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Añadimos updateDoc
import { ref, deleteObject } from 'firebase/storage';
import './AdminPage.css';

const AdminPage = () => {
    const { docs: obras } = useFirestore('obras');
    const { docs: mensajes } = useFirestore('mensajes');

    // ESTADOS PARA EDICIÓN
    const [editandoId, setEditandoId] = useState(null);
    const [nuevoTitulo, setNuevoTitulo] = useState("");

    // FUNCIÓN PARA ELIMINAR
    const handleEliminar = async (id, urlImagen) => {
        if (window.confirm("¿Deseas eliminar esta obra permanentemente del Éter?")) {
            try {
                await deleteDoc(doc(db, 'obras', id));
                const imagenRef = ref(storage, urlImagen);
                await deleteObject(imagenRef);
                alert("Obra eliminada.");
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Hubo un error al eliminar. (Nota: Si la imagen es externa, no se podrá borrar del Storage)");
            }
        }
    };

    // FUNCIÓN PARA ACTUALIZAR (EDICIÓN)
    const handleGuardarEdicion = async (id) => {
        try {
            const obraRef = doc(db, 'obras', id);
            await updateDoc(obraRef, {
                titulo: nuevoTitulo
            });
            setEditandoId(null);
            alert("Título actualizado con éxito.");
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al actualizar el título.");
        }
    };


    const toggleLeido = async (id, estadoActual) => {
        try {
            const mensajeRef = doc(db, 'mensajes', id);
            await updateDoc(mensajeRef, {
                leido: !estadoActual
            });
            // No hace falta alert, el cambio se verá reflejado por el hook useFirestore
        } catch (error) {
            console.error("Error al actualizar mensaje:", error);
        }
    };
    
    const eliminarMensaje = async (id) => {
        if (window.confirm("¿Deseas borrar este mensaje del Éter?")) {
            try {
                await deleteDoc(doc(db, 'mensajes', id));
            } catch (error) {
                console.error("Error al eliminar mensaje:", error);
            }
        }
    };
    return (
        <div className="admin-page">
            <h1 className="admin-title">Panel de Administración</h1>
            <p className="admin-subtitle">Gestiona el contenido de tu mundo artístico.</p>
            
            <div className="admin-layout-grid">
                {/* SECCIÓN DE SUBIDA */}
                <section className="admin-upload-section">
                    <h2 className="section-title">Nueva Obra</h2>
                    <UploadArtworkForm />
                </section>

                {/* SECCIÓN DE GESTIÓN DE OBRAS */}
                <section className="admin-management-section">
                    <h2 className="section-title">Obras en Galería</h2>
                    <div className="admin-obras-list">
                        {obras && obras.map(obra => (
                            <div key={obra.id} className="admin-obra-item">
                                <img src={obra.imagenSrc} alt={obra.titulo} className="admin-item-thumb" />
                                
                                <div className="admin-item-info">
                                    {editandoId === obra.id ? (
                                        <div className="edit-mode">
                                            <input 
                                                type="text" 
                                                value={nuevoTitulo} 
                                                onChange={(e) => setNuevoTitulo(e.target.value)}
                                                className="admin-edit-input"
                                            />
                                            <div className="edit-buttons">
                                                <button onClick={() => handleGuardarEdicion(obra.id)} className="btn-save">💾</button>
                                                <button onClick={() => setEditandoId(null)} className="btn-cancel">✖</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="obra-titulo-display">{obra.titulo}</span>
                                            <div className="item-actions">
                                                <button 
                                                    onClick={() => {
                                                        setEditandoId(obra.id);
                                                        setNuevoTitulo(obra.titulo);
                                                    }}
                                                    className="admin-btn-edit"
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button 
                                                    onClick={() => handleEliminar(obra.id, obra.imagenSrc)}
                                                    className="admin-btn-delete"
                                                >
                                                    🗑️ Eliminar
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

    {/* SECCIÓN DE MENSAJES (Buzón Actualizado) */}
    <section className="admin-messages-section">
        <h2 className="section-title">Buzón de Mensajes</h2>
        <div className="messages-container">
            {mensajes && mensajes.length > 0 ? (
                mensajes.map(msg => (
                    <div key={msg.id} className={`message-card ${msg.leido ? 'read' : 'unread'}`}>
                        <div className="message-header">
                            <div className="sender-info">
                                <strong>{msg.nombre}</strong>
                                <span>{msg.email}</span>
                            </div>
                            <div className="message-actions">
                                {/* Botón de Leído/No Leído */}
                                <button 
                                    onClick={() => toggleLeido(msg.id, msg.leido)}
                                    className="btn-icon"
                                    title={msg.leido ? "Marcar como no leído" : "Marcar como leído"}
                                >
                                    {msg.leido ? '👁️‍🗨️' : '👁️'}
                                </button>
                                {/* Botón de Eliminar Mensaje */}
                                <button 
                                    onClick={() => eliminarMensaje(msg.id)}
                                    className="btn-icon btn-delete-msg"
                                    title="Eliminar mensaje"
                                >
                                    🗑️
                                </button>
                            </div>
                        <div className="message-header">
                            <strong>{msg.nombre}</strong>
                            <span>{msg.email}</span>
                            {msg.discordUser && (
                                <span className="discord-tag">
                                    🎮 {msg.discordUser}
                                </span>
                            )}
                        </div>
                        <p className="message-body">{msg.mensaje}</p>
                        <div className="message-footer">
                            <small>{msg.fecha?.toDate().toLocaleString()}</small>
                            {msg.leido && <span className="status-badge">Leído</span>}
                        </div>

                        </div>
                    </div>

                ))
            ) : (
                <p className="no-messages">El Éter está en silencio... (No hay mensajes).</p>
            )}
        </div>
    </section>

            <div className="admin-actions">
                <a className="admin-backlink" href="/"> &larr; Volver al Home </a>
                <button className="admin-logout-btn" onClick={() => signOut(auth)}>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default AdminPage;