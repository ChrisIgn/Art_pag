import React, { useState } from 'react'; // Añadimos useState
import UploadArtworkForm from '../components/UploadArtworkForm';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';
import { setDoc,doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Añadimos updateDoc
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AdminPage.css';
import { useConfig } from '../hooks/useConfig';

const AdminPage = () => {
    const { docs: obras } = useFirestore('obras');
    const { docs: mensajes } = useFirestore('mensajes');
    const { config, loading } = useConfig();
    const [previewUrl, setPreviewUrl] = useState(null);
    // ESTADOS PARA EDICIÓN
    const [editandoId, setEditandoId] = useState(null);
    const [nuevoTitulo, setNuevoTitulo] = useState("");
    // 1. Añade estos nuevos estados al inicio del componente
    const [editConfig, setEditConfig] = useState(false);
    const [tempConfig, setTempConfig] = useState({});
    const [archivoImagen, setArchivoImagen] = useState(null);
    const [subiendo, setSubiendo] = useState(false); // Para mostrar un estado de carga
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
    // Función para manejar el cambio de archivo
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArchivoImagen(file);
            // Creamos una URL temporal para la vista previa
            setPreviewUrl(URL.createObjectURL(file));
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

        // 2. Función para guardar los nuevos textos
    const handleGuardarConfigOc = async () => {
    setSubiendo(true);
    let urlFinal = tempConfig.ocImagenUrl; // Por defecto la que ya existe

    try {
        // 1. Si seleccionaste un archivo nuevo, subirlo a Storage
        if (archivoImagen) {
            const nombreArchivo = `config/hero_${Date.now()}`;
            const storageRef = ref(storage, nombreArchivo);
            
            const snapshot = await uploadBytes(storageRef, archivoImagen);
            urlFinal = await getDownloadURL(snapshot.ref);
        }

        // 2. Actualizar Firestore con los textos y la URL (nueva o vieja)
        const docRef = doc(db, 'comisionesAbiertas', 'global');
        await updateDoc(docRef, {
            ocTitulo: tempConfig.ocTitulo,
            ocSubtitulo: tempConfig.ocSubtitulo,
            ocImagenUrl: urlFinal
        });

            setEditConfig(false);
            setArchivoImagen(null);
            alert("¡Configuración actualizada con éxito!");
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al guardar los cambios.");
        } finally {
            setSubiendo(false);
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
    // Función para alternar estado de comisiones
    const toggleComisiones = async () => {
        const docRef = doc(db, 'comisionesAbiertas', 'global');
        
        try {
            await setDoc(docRef, {
                // USAR EL NOMBRE CORRECTO: comisionesAbiertas
                comisionesAbiertas: !config.comisionesAbiertas 
            }, { merge: true });
            
            console.log("Cambio enviado a comisionesAbiertas");
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };
        if (loading) return <p>Cargando configuración...</p>;

    
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
    {/* Sección de Ajustes Rápidos */}
    <section className="admin-quick-settings">
        <div className="setting-item">
            <span>Estado de Comisiones: </span>
            <button 
                onClick={toggleComisiones}
                className={`btn-switch ${config.comisionesAbiertas ? 'active' : 'inactive'}`}
            >
                {config.comisionesAbiertas ? "ABIERTAS" : "CERRADAS"}
            </button>
        </div>
    </section>

    {/* --- NUEVA SECCIÓN: Editar OcIntro --- */}
        <div className="setting-item-edit">
            <h3>Editar Sección Intro (OC)</h3>
    {!editConfig ? (
        <button onClick={() => {
            setEditConfig(true);
            setTempConfig({
                ocTitulo: config.ocTitulo || "",
                ocSubtitulo: config.ocSubtitulo || "",
                ocImagenUrl: config.ocImagenUrl || ""
            });
        }} className="admin-btn-edit">✏️ Editar Textos e Imagen</button>
    ) : (
        <div className="config-edit-form">
            <label>Título Intro:</label>
            <input 
                type="text" 
                value={tempConfig.ocTitulo} 
                onChange={(e) => setTempConfig({...tempConfig, ocTitulo: e.target.value})}
            />
            
            <label>Subtítulo Intro:</label>
            <textarea 
                value={tempConfig.ocSubtitulo} 
                onChange={(e) => setTempConfig({...tempConfig, ocSubtitulo: e.target.value})}
            />

            <label>Imagen de Fondo (Archivo):</label>
                <div className="file-upload-wrapper">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="admin-file-input"
                    />
                    
                    {/* VISTA PREVIA DINÁMICA */}
                    {(previewUrl || tempConfig.ocImagenUrl) && (
                        <div className="image-preview-container">
                            <span className="preview-badge">
                                {previewUrl ? "Nueva (Vista Previa)" : "Actual"}
                            </span>
                            <img 
                                src={previewUrl || tempConfig.ocImagenUrl} 
                                alt="Vista previa fondo" 
                            />
                        </div>
                    )}
                    
                    {archivoImagen && <p className="file-name">📷 Seleccionado: {archivoImagen.name}</p>}
                </div>

            <div className="edit-buttons">
                <button 
                    onClick={handleGuardarConfigOc} 
                    className="btn-save" 
                    disabled={subiendo}
                >
                    {subiendo ? "Subiendo..." : "Guardar Cambios"}
                </button>
                <button 
                    onClick={() => {
                        setEditConfig(false);
                        setArchivoImagen(null);
                    }} 
                    className="btn-cancel"
                    disabled={subiendo}
                >
                    Cancelar
                </button>
            </div>
        </div>
    )}
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
                                <span className="sender-email">{msg.email}</span>
                                {msg.servicio && (
                                    <span className="sender-servicio"> - {msg.servicio}</span>
                                )}
                                {msg.discordUser && (
                                    <span className="discord-tag">🎮 {msg.discordUser}</span>
                                )}
                            </div>
                            <div className="message-actions">
                                <button
                                    onClick={() => toggleLeido(msg.id, msg.leido)}
                                    className="btn-icon"
                                    title={msg.leido ? "Marcar como no leído" : "Marcar como leído"}
                                >
                                    {msg.leido ? '👁️‍🗨️' : '👁️'}
                                </button>
                                <button
                                    onClick={() => eliminarMensaje(msg.id)}
                                    className="btn-icon btn-delete-msg"
                                    title="Eliminar mensaje"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>

                        <p className="message-body">{msg.mensaje}</p>

                        <div className="message-footer">
                            <small>{msg.fecha?.toDate().toLocaleString()}</small>
                            {msg.leido && <span className="status-badge">Leído</span>}
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