// src/hooks/useFirestore.js
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query} from 'firebase/firestore';

export const useFirestore = (coleccion) => {
    const [docs, setDocs] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // 1. Creamos una consulta (opcionalmente puedes ordenar por fecha)
        const coleccionRef = collection(db, coleccion);
        const q = query(coleccionRef); 

        // 2. onSnapshot escucha cambios en tiempo real
        // Esta función se ejecuta CADA VEZ que algo cambia en Firebase
        const unsub = onSnapshot(q, (snapshot) => {
            const documentos = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setDocs(documentos);
            setCargando(false);
        }, (error) => {
            console.log("Error en tiempo real:", error);
            setCargando(false);
        });

        // 3. Limpieza: Cuando el componente se destruye, dejamos de escuchar
        return () => unsub();
        
    }, [coleccion]);

    return { docs, cargando };
};