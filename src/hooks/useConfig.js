// useConfig.js
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

export const useConfig = () => {
    const [config, setConfig] = useState({ 
        comisionesAbiertas: false,
        ocTitulo: "Cargando...",
        ocSubtitulo: "Cargando...",
        ocImagenUrl: "" // URL de la imagen en Firebase Storage o link externo
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const docRef = doc(db, 'comisionesAbiertas', 'global');
        
        const unsub = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setConfig(docSnap.data());
            }
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return { config, loading };
};