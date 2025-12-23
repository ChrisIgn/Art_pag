import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) return <div style={{color: 'white', textAlign: 'center', marginTop: '100px'}}>Verificando sesión...</div>;
    
    // Si no hay usuario, lo manda al login
    if (!user) return <Navigate to="/login" />;

    return children;
};

export default ProtectedRoute;