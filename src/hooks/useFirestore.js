// Dentro de useFirestore.js (Asegúrate de que se vea algo así)
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export const useFirestore = (coleccion) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, coleccion), orderBy('fecha', 'desc'));
    
    // onSnapshot es la clave para que sea INMEDIATO
    const unsub = onSnapshot(q, (snapshot) => {
      let documents = [];
      snapshot.forEach(doc => {
        documents.push({...doc.data(), id: doc.id});
      });
      setDocs(documents);
    });

    return () => unsub(); // Limpieza al desmontar
  }, [coleccion]);

  return { docs };
};