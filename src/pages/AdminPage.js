import React, { useState } from 'react';

// Components
import UploadArtworkForm from '../components/UploadArtworkForm';

// Firebase
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../firebase/config';
import { collection, setDoc, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';

// Hooks
import { useFirestore } from '../hooks/useFirestore';
import { useConfig } from '../hooks/useConfig';
import { useIdleTimeout } from '../hooks/useIdleTimeout';

// Styles
import './AdminPage.css';

const AdminPage = () => {
    // Timeout de seguridad
    useIdleTimeout(15);
    
    // VERIFICACIÓN MODO DEMO
    const usuarioActual = auth.currentUser;
    const esModoDemo = usuarioActual && usuarioActual.email === 'demo@eriiart.com';

    // Firestore hooks
    const { docs: obras } = useFirestore('obras');
    const { docs: mensajes } = useFirestore('mensajes');
    const { docs: serviciosFirebase } = useFirestore('servicios');
    const { docs: personajesFirebase } = useFirestore('personajes');

    // Config hook
    const { config, loading } = useConfig();

    // UI state
    const [previewUrl, setPreviewUrl] = useState(null);
    const [subiendo, setSubiendo] = useState(false);

    // Edición obras
    const [editandoId, setEditandoId] = useState(null);
    const [nuevoTitulo, setNuevoTitulo] = useState("");

    // Editar config OC (Intro del Home)
    const [editConfig, setEditConfig] = useState(false);
    const [tempConfig, setTempConfig] = useState({});
    const [archivoImagen, setArchivoImagen] = useState(null);

    // Servicios (tarifas)
    const [servicioEditando, setServicioEditando] = useState(null);
    const [tempServicio, setTempServicio] = useState({});
    
    // Gestor de Personajes (OCs)
    const [editandoOcId, setEditandoOcId] = useState(null);
    const [guardandoOc, setGuardandoOc] = useState(false);
    const [tempOc, setTempOc] = useState({ 
        titulo: '', nombreCodigo: '', clase: '', descripcion: '', habilidades: [] 
    });
    const [imgPuraFile, setImgPuraFile] = useState(null);
    const [imgCaidaFile, setImgCaidaFile] = useState(null);

    // ==========================================
    // FUNCIONES (Se mantienen igual, la UI las bloquea)
    // ==========================================
    const handleEliminar = async (id, urlImagen) => {
        if (window.confirm("¿Deseas eliminar esta obra permanentemente del Éter?")) {
            try {
                await deleteDoc(doc(db, 'obras', id));
                const imagenRef = ref(storage, urlImagen);
                await deleteObject(imagenRef);
                alert("Obra eliminada.");
            } catch (error) { console.error("Error al eliminar:", error); }
        }
    };

    const handleGuardarEdicion = async (id) => {
        try {
            await updateDoc(doc(db, 'obras', id), { titulo: nuevoTitulo });
            setEditandoId(null);
            alert("Título actualizado con éxito.");
        } catch (error) { console.error("Error al actualizar:", error); }
    };

    const handleAddIncluye = () => setTempServicio({ ...tempServicio, incluye: [...(tempServicio.incluye || []), " Nuevo detalle"] });
    const handleRemoveIncluye = (index) => {
        const nuevaLista = [...tempServicio.incluye];
        nuevaLista.splice(index, 1);
        setTempServicio({ ...tempServicio, incluye: nuevaLista });
    };
    const handleChangeIncluye = (index, valor) => {
        const nuevaLista = [...tempServicio.incluye];
        nuevaLista[index] = valor;
        setTempServicio({ ...tempServicio, incluye: nuevaLista });
    };

    const handleGuardarServicio = async (idParametro) => {
        const idExtraido = typeof idParametro === 'object' && idParametro.target ? undefined : idParametro;
        if (!idExtraido) return;
        try {
            const datosAEnviar = { ...tempServicio };
            delete datosAEnviar.id; 
            await updateDoc(doc(db, 'servicios', String(idExtraido)), datosAEnviar);
            setServicioEditando(null);
            alert("¡Tarifa y detalles actualizados con éxito!");
        } catch (error) { console.error("Error al actualizar en Firebase:", error); }
    };

    const handleNuevoOc = () => {
        setEditandoOcId('nuevo');
        setTempOc({ titulo: '', nombreCodigo: '', clase: '', descripcion: '', habilidades: [] });
        setImgPuraFile(null);
        setImgCaidaFile(null);
    };

    const handleAddHabOc = () => setTempOc({ ...tempOc, habilidades: [...(tempOc.habilidades || []), ""] });
    const handleRemoveHabOc = (index) => {
        const nuevaLista = [...tempOc.habilidades];
        nuevaLista.splice(index, 1);
        setTempOc({ ...tempOc, habilidades: nuevaLista });
    };
    const handleChangeHabOc = (index, valor) => {
        const nuevaLista = [...tempOc.habilidades];
        nuevaLista[index] = valor;
        setTempOc({ ...tempOc, habilidades: nuevaLista });
    };

    const handleGuardarOc = async () => {
        setGuardandoOc(true);
        try {
            let urlPura = tempOc.imgPuraUrl || '';
            let urlCaida = tempOc.imgCaidaUrl || '';

            if (imgPuraFile) {
                const storageRef = ref(storage, `personajes/${Date.now()}_pura_${imgPuraFile.name}`);
                await uploadBytes(storageRef, imgPuraFile);
                urlPura = await getDownloadURL(storageRef);
            }
            if (imgCaidaFile) {
                const storageRef2 = ref(storage, `personajes/${Date.now()}_caida_${imgCaidaFile.name}`);
                await uploadBytes(storageRef2, imgCaidaFile);
                urlCaida = await getDownloadURL(storageRef2);
            }

            const datosAEnviar = { ...tempOc, imgPuraUrl: urlPura, imgCaidaUrl: urlCaida };
            delete datosAEnviar.id;

            if (editandoOcId === 'nuevo') await addDoc(collection(db, 'personajes'), datosAEnviar);
            else await updateDoc(doc(db, 'personajes', editandoOcId), datosAEnviar);

            setEditandoOcId(null);
            alert("¡Personaje guardado en el Éter!");
        } catch (error) { console.error("Error guardando OC:", error); }
        setGuardandoOc(false);
    };

    const handleEliminarOc = async (id) => {
        if (window.confirm("¿Seguro que deseas borrar este personaje del Éter?")) {
            await deleteDoc(doc(db, 'personajes', id));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArchivoImagen(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleGuardarConfigOc = async () => {
        setSubiendo(true);
        let urlFinal = tempConfig.ocImagenUrl; 
        try {
            if (archivoImagen) {
                const snapshot = await uploadBytes(ref(storage, `config/hero_${Date.now()}`), archivoImagen);
                urlFinal = await getDownloadURL(snapshot.ref);
            }
            await updateDoc(doc(db, 'comisionesAbiertas', 'global'), {
                ocTitulo: tempConfig.ocTitulo,
                ocSubtitulo: tempConfig.ocSubtitulo,
                ocImagenUrl: urlFinal
            });
            setEditConfig(false);
            setArchivoImagen(null);
            alert("¡Configuración actualizada con éxito!");
        } catch (error) { console.error("Error al actualizar:", error); } 
        finally { setSubiendo(false); }
    };

    const toggleComisiones = async () => {
        try { await setDoc(doc(db, 'comisionesAbiertas', 'global'), { comisionesAbiertas: !config.comisionesAbiertas }, { merge: true }); } 
        catch (error) { console.error("Error al actualizar:", error); }
    };

    const toggleLeido = async (id, estadoActual) => {
        try { await updateDoc(doc(db, 'mensajes', id), { leido: !estadoActual }); } 
        catch (error) { console.error("Error al actualizar mensaje:", error); }
    };
    
    const eliminarMensaje = async (id) => {
        if (window.confirm("¿Deseas borrar este mensaje del Éter?")) {
            try { await deleteDoc(doc(db, 'mensajes', id)); } 
            catch (error) { console.error("Error al eliminar mensaje:", error); }
        }
    };

    if (loading) return <p>Cargando configuración...</p>;

    return (
        <div className="admin-page">
            <h1 className="admin-title">Panel de Administración {esModoDemo && <span style={{color: '#ff7eb9'}}>(Modo Demo)</span>}</h1>
            <p className="admin-subtitle">
                {esModoDemo ? "Estás viendo una versión de Solo Lectura. Los cambios están desactivados." : "Gestiona el contenido de tu mundo artístico."}
            </p>
            
            <div className="admin-layout-grid">
                {/* SECCIÓN DE SUBIDA DE OBRAS */}
                <section className="admin-upload-section">
                    <h2 className="section-title">Nueva Obra</h2>
                    {esModoDemo && <p style={{color: '#ff7eb9', fontSize: '0.85rem'}}>🔒 Subida desactivada en Demo</p>}
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
                                            <input type="text" value={nuevoTitulo} onChange={(e) => setNuevoTitulo(e.target.value)} className="admin-edit-input"/>
                                            <div className="edit-buttons">
                                                <button onClick={() => handleGuardarEdicion(obra.id)} className="btn-save" disabled={esModoDemo}>
                                                    {esModoDemo ? '🔒' : '💾'}
                                                </button>
                                                <button onClick={() => setEditandoId(null)} className="btn-cancel">✖</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="obra-titulo-display">{obra.titulo}</span>
                                            <div className="item-actions">
                                                <button onClick={() => { setEditandoId(obra.id); setNuevoTitulo(obra.titulo); }} className="admin-btn-edit">✏️ Editar</button>
                                                <button onClick={() => handleEliminar(obra.id, obra.imagenSrc)} className="admin-btn-delete" disabled={esModoDemo}>
                                                    {esModoDemo ? '🔒 Bloqueado' : '🗑️ Eliminar'}
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

            {/* Ajustes Rápidos */}
            <section className="admin-quick-settings">
                <div className="setting-item">
                    <span>Estado de Comisiones: </span>
                    <button 
                        onClick={toggleComisiones} 
                        className={`btn-switch ${config.comisionesAbiertas ? 'active' : 'inactive'}`}
                        disabled={esModoDemo}
                    >
                        {esModoDemo ? "🔒 DEMO" : (config.comisionesAbiertas ? "ABIERTAS" : "CERRADAS")}
                    </button>
                </div>
            </section>

            {/* SECCIÓN: Editar OcIntro */}
            <div className="setting-item-edit">
                <h3>Editar Sección Intro (OC)</h3>
                {!editConfig ? (
                    <button onClick={() => {
                        setEditConfig(true);
                        setTempConfig({ ocTitulo: config.ocTitulo || "", ocSubtitulo: config.ocSubtitulo || "", ocImagenUrl: config.ocImagenUrl || "" });
                    }} className="admin-btn-edit">✏️ Editar Textos e Imagen</button>
                ) : (
                    <div className="config-edit-form">
                        <label>Título Intro:</label>
                        <input type="text" value={tempConfig.ocTitulo} onChange={(e) => setTempConfig({...tempConfig, ocTitulo: e.target.value})} />
                        <label>Subtítulo Intro:</label>
                        <textarea value={tempConfig.ocSubtitulo} onChange={(e) => setTempConfig({...tempConfig, ocSubtitulo: e.target.value})} />
                        <label>Imagen de Fondo (Archivo):</label>
                        <div className="file-upload-wrapper">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="admin-file-input" />
                            {(previewUrl || tempConfig.ocImagenUrl) && (
                                <div className="image-preview-container">
                                    <span className="preview-badge">{previewUrl ? "Nueva (Vista Previa)" : "Actual"}</span>
                                    <img src={previewUrl || tempConfig.ocImagenUrl} alt="Vista previa fondo" />
                                </div>
                            )}
                        </div>
                        <div className="edit-buttons">
                            <button onClick={handleGuardarConfigOc} className="btn-save" disabled={subiendo || esModoDemo}>
                                {esModoDemo ? "🔒 Solo Lectura" : (subiendo ? "Subiendo..." : "Guardar Cambios")}
                            </button>
                            <button onClick={() => { setEditConfig(false); setArchivoImagen(null); }} className="btn-cancel">Cancelar</button>
                        </div>
                    </div>
                )}
            </div>

            {/* SECCIÓN: GESTIÓN DE TARIFAS */}
            <section className="admin-management-section">
                <h2 className="section-title">💰 Gestión de Tarifas (Comisiones)</h2>
                <div className="admin-servicios-list">
                    {serviciosFirebase && serviciosFirebase.map(srv => (
                        <div key={srv.id} className={`admin-servicio-item ${srv.destacado ? 'destacado' : ''}`}>
                            {servicioEditando === srv.id ? (
                                <div className="edit-mode-vertical">
                                    <label>Nombre del Servicio:</label>
                                    <input type="text" value={tempServicio.tipo} onChange={(e) => setTempServicio({...tempServicio, tipo: e.target.value})} />
                                    <label>Precio:</label>
                                    <input type="text" value={tempServicio.precio} onChange={(e) => setTempServicio({...tempServicio, precio: e.target.value})} />
                                    <label>¿Qué incluye? (Lista):</label>
                                    <div className="incluye-edit-list">
                                        {tempServicio.incluye && tempServicio.incluye.map((item, index) => (
                                            <div key={index} className="incluye-item-row">
                                                <input type="text" value={item} onChange={(e) => handleChangeIncluye(index, e.target.value)} />
                                                <button onClick={() => handleRemoveIncluye(index)} className="btn-remove-item" disabled={esModoDemo}>🗑️</button>
                                            </div>
                                        ))}
                                        <button onClick={handleAddIncluye} className="btn-add-item" disabled={esModoDemo}>+ Añadir Item</button>
                                    </div>
                                    <label>Descripción:</label>
                                    <textarea value={tempServicio.descripcion} onChange={(e) => setTempServicio({...tempServicio, descripcion: e.target.value})} />
                                    <div className="edit-buttons">
                                        <button onClick={() => handleGuardarServicio(srv.id)} className="btn-save" disabled={esModoDemo}>
                                            {esModoDemo ? '🔒 Bloqueado' : 'Guardar'}
                                        </button>
                                        <button onClick={() => setServicioEditando(null)} className="btn-cancel">Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="servicio-info-display">
                                    <div className="srv-header">
                                        <strong>{srv.tipo}</strong>
                                        <span className="srv-price">{srv.precio}</span>
                                    </div>
                                    <p>{srv.descripcion}</p>
                                    <button onClick={() => { setServicioEditando(srv.id); setTempServicio(srv); }} className="admin-btn-edit">✏️ Editar Tarifa</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* SECCIÓN: GESTOR DE PERSONAJES */}
            <section className="admin-management-section">
                <h2 className="section-title">🎭 Gestor de Personajes (OCs)</h2>
                {!editandoOcId && (
                    <button onClick={handleNuevoOc} className="btn-add-item" style={{ marginBottom: '20px' }}>
                        + Añadir Nuevo Personaje
                    </button>
                )}
                {editandoOcId && (
                    <div className="edit-mode-vertical" style={{ marginBottom: '30px', border: '1px solid #ff7eb9', padding: '15px', borderRadius: '8px' }}>
                        <h3>{editandoOcId === 'nuevo' ? '✨ Creando Nuevo Personaje' : '✏️ Editando Personaje'}</h3>
                        <input type="text" placeholder="Título" value={tempOc.titulo} onChange={(e) => setTempOc({...tempOc, titulo: e.target.value})} />
                        <input type="text" placeholder="Nombre Código" value={tempOc.nombreCodigo} onChange={(e) => setTempOc({...tempOc, nombreCodigo: e.target.value})} />
                        <input type="text" placeholder="Clase" value={tempOc.clase} onChange={(e) => setTempOc({...tempOc, clase: e.target.value})} />
                        <textarea placeholder="Historia..." value={tempOc.descripcion} onChange={(e) => setTempOc({...tempOc, descripcion: e.target.value})} style={{ minHeight: '100px' }} />

                        <div className="oc-image-upload-container">
                            <div className="oc-image-box pura">
                                <label style={{ color: '#4A90E2', fontWeight: 'bold' }}>Fase Pura:</label>
                                <input type="file" accept="image/*" onChange={(e) => setImgPuraFile(e.target.files[0])} disabled={esModoDemo} />
                                {tempOc.imgPuraUrl && !imgPuraFile && <img src={tempOc.imgPuraUrl} alt="Pura actual" className="oc-preview-img" />}
                            </div>
                            <div className="oc-image-box caida">
                                <label style={{ color: '#ff7eb9', fontWeight: 'bold' }}>Fase Caída:</label>
                                <input type="file" accept="image/*" onChange={(e) => setImgCaidaFile(e.target.files[0])} disabled={esModoDemo} />
                                {tempOc.imgCaidaUrl && !imgCaidaFile && <img src={tempOc.imgCaidaUrl} alt="Caída actual" className="oc-preview-img" />}
                            </div>
                        </div>

                        <label>Habilidades:</label>
                        <div className="incluye-edit-list">
                            {tempOc.habilidades && tempOc.habilidades.map((hab, index) => (
                                <div key={index} className="incluye-item-row">
                                    <input type="text" value={hab} onChange={(e) => handleChangeHabOc(index, e.target.value)} />
                                    <button onClick={() => handleRemoveHabOc(index)} className="btn-remove-item" disabled={esModoDemo}>🗑️</button>
                                </div>
                            ))}
                            <button onClick={handleAddHabOc} className="btn-add-item" disabled={esModoDemo}>+ Añadir Habilidad</button>
                        </div>

                        <div className="edit-buttons" style={{ marginTop: '20px' }}>
                            <button onClick={handleGuardarOc} className="btn-save" disabled={guardandoOc || esModoDemo}>
                                {esModoDemo ? '🔒 Solo Lectura' : (guardandoOc ? 'Guardando...' : 'Guardar Personaje')}
                            </button>
                            <button onClick={() => setEditandoOcId(null)} className="btn-cancel">Cancelar</button>
                        </div>
                    </div>
                )}

                <div className="admin-servicios-grid">
                    {personajesFirebase && personajesFirebase.map(oc => (
                        <div key={oc.id} className="admin-servicio-card">
                            <h4>{oc.titulo} <span style={{fontSize: '0.8rem', color: 'gray'}}>({oc.nombreCodigo})</span></h4>
                            <p className="desc-text">{oc.clase}</p>
                            <div className="edit-buttons" style={{marginTop: '15px'}}>
                                <button onClick={() => { setEditandoOcId(oc.id); setTempOc(oc); setImgPuraFile(null); setImgCaidaFile(null); }} className="admin-btn-edit">✏️ Editar</button>
                                <button onClick={() => handleEliminarOc(oc.id)} className="btn-remove-item" disabled={esModoDemo}>
                                    {esModoDemo ? '🔒' : '🗑️'} Borrar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECCIÓN DE MENSAJES */}
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
                                    </div>
                                    <div className="message-actions">
                                        <button onClick={() => toggleLeido(msg.id, msg.leido)} className="btn-icon" disabled={esModoDemo} title={esModoDemo ? "Bloqueado en Demo" : "Cambiar estado"}>
                                            {esModoDemo ? '🔒' : (msg.leido ? '👁️‍🗨️' : '👁️')}
                                        </button>
                                        <button onClick={() => eliminarMensaje(msg.id)} className="btn-icon btn-delete-msg" disabled={esModoDemo} title="Eliminar">
                                            {esModoDemo ? '🔒' : '🗑️'}
                                        </button>
                                    </div>
                                </div>
                                <p className="message-body">{msg.mensaje}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-messages">El Éter está en silencio... (No hay mensajes).</p>
                    )}
                </div>
            </section>

            <div className="admin-actions">
                <a className="admin-backlink" href="/"> &larr; Volver al Home </a>
                <button className="admin-logout-btn" onClick={() => signOut(auth)}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default AdminPage;