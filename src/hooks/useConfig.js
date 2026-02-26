import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

export const useConfig = () => {
    // Definimos el estado inicial con el nombre correcto del campo
    const [config, setConfig] = useState({ comisionesAbiertas: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const docRef = doc(db, 'comisionesAbiertas', 'global');
        
        const unsub = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                // Aquí guardamos los datos. 
                // Si en Firebase el campo se llama 'comisionesAbiertas', esto funcionará.
                setConfig(doc.data());
            }
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return { config, loading };
};