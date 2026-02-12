import React from 'react';
import UploadArtworkForm from '../components/UploadArtworkForm';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore'; // Importamos tu hook
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import './AdminPage.css';

const AdminPage = () => {
    // Obtenemos las obras actuales para poder gestionarlas
    const { docs: obras } = useFirestore('obras');

    const handleEliminar = async (id, urlImagen) => {
        if (window.confirm("¿Deseas eliminar esta obra permanentemente del Éter?")) {
            try {
                // 1. Borrar documento en Firestore
                await deleteDoc(doc(db, 'obras', id));
                
                // 2. Borrar archivo en Storage
                // Nota: Esto funciona mejor si guardaste el path o la URL es directa de Firebase
                const imagenRef = ref(storage, urlImagen);
                await deleteObject(imagenRef);
                
                alert("Obra eliminada.");
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Hubo un error al eliminar la obra.");
            }
        }
    };

    return (
        <div className="admin-page">
            <h1 className="admin-title">Panel de Administración</h1>
            <p className="admin-subtitle">Sube nuevas obras o gestiona las existentes.</p>
            
            <div className="admin-layout-grid">
                {/* SECCIÓN DE SUBIDA */}
                <section className="admin-upload-section">
                    <UploadArtworkForm />
                </section>

                {/* SECCIÓN DE GESTIÓN (LISTADO) */}
                <section className="admin-management-section">
                    <h2 className="section-title">Obras en Galería</h2>
                    <div className="admin-obras-list">
                        {obras && obras.map(obra => (
                            <div key={obra.id} className="admin-obra-item">
                                <img src={obra.imagenSrc} alt={obra.titulo} className="admin-item-thumb" />
                                <div className="admin-item-info">
                                    <span>{obra.titulo}</span>
                                    <button 
                                        onClick={() => handleEliminar(obra.id, obra.imagenSrc)}
                                        className="admin-btn-delete"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            
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