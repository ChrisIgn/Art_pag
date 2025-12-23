import React from 'react';
import UploadArtworkForm from '../components/UploadArtworkForm'; // Tu formulario
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const AdminPage = () => {
    return (
        <div style={{ padding: '100px 20px 40px', backgroundColor: '#0E1624', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ color: '#4A90E2', textAlign: 'center', marginBottom: '40px', fontSize: '3em' }}>
                Panel de Administración de Contenido
            </h1>
            <p style={{ color: '#9BA9B8', textAlign: 'center', marginBottom: '50px' }}>
                Utiliza este formulario para subir nuevas obras a la galería.
            </p>
            
            {/* El formulario centrado */}
            <UploadArtworkForm />
            
            {/* Opcional: Un enlace rápido para volver */}
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                 <a href="/" style={{ color: '#4A90E2', textDecoration: 'none', fontSize: '1.2em' }}>
                    &larr; Volver al Home


            <button 
            onClick={() => signOut(auth)} 
            style={{ marginTop: '20px', background: '#ff6347', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
            >
            Cerrar Sesión
            </button>
                 </a>
            </div>
        </div>
    );
};

export default AdminPage;