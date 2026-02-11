import React from 'react';
import UploadArtworkForm from '../components/UploadArtworkForm'; // Tu formulario
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import './AdminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <h1 className="admin-title">
                Panel de Administración de Contenido
            </h1>
            <p className="admin-subtitle">
                Utiliza este formulario para subir nuevas obras a la galería.
            </p>
            
            {/* El formulario centrado */}
            <UploadArtworkForm />
            
            {/* Opcional: Un enlace rápido para volver */}
              <div className="admin-actions">
                  <a className="admin-backlink" href="/">
                    &larr; Volver al Home

              <button onClick={() => signOut(auth)}>
              Cerrar Sesión
              </button>
                  </a>
              </div>
        </div>
    );
};

export default AdminPage;