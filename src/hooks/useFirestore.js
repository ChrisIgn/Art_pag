// src/hooks/useFirestore.js

import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const useFirestore = (coleccion) => {
    
    const [docs, setDocs] = useState([]); // Aquí guardaremos las obras
    const [cargando, setCargando] = useState(true); // Para saber si está cargando

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                // 1. Referencia a la colección 'obras' en tu BD
                const coleccionRef = collection(db, coleccion);
                
                // 2. Traer los documentos (petición asíncrona)
                const snapshot = await getDocs(coleccionRef);

                // 3. Formatear los datos para usarlos en React
                const documentos = snapshot.docs.map(doc => ({
                    id: doc.id,     // El ID único de Firebase
                    ...doc.data()   // El resto de datos (titulo, imagen, etc.)
                }));

                setDocs(documentos);
                setCargando(false);
            } catch (error) {
                console.log(error);
                setCargando(false);
            }
        };

        obtenerDatos();
    }, [coleccion]);

    return { docs, cargando };
};