import React from 'react';
import { useFirestore } from '../hooks/useFirestore';

const TestFirebaseData = () => {
  
  // Asumimos que 'obras' es el nombre de la colección en Firestore
  const { docs, cargando } = useFirestore('obras');

  if (cargando) {
    return <p style={{ color: 'white', textAlign: 'center', padding: '20px', border: '1px solid gray' }}>
      [TEST FIREBASE] Conectando...
    </p>;
  }

  if (docs.length === 0) {
    return <p style={{ color: 'red', textAlign: 'center', padding: '20px', border: '1px solid red' }}>
      [TEST FIREBASE] Éxito en la conexión, pero la colección 'obras' está vacía o hay un bloqueo de seguridad en la lectura.
    </p>;
  }

  return (
    <div style={{ color: 'white', backgroundColor: '#1a2331', border: '2px solid #4A90E2', padding: '15px', margin: '20px' }}>
      <h3 style={{ color: '#4A90E2' }}>[TEST FIREBASE] Conexión Exitosa: ({docs.length} documentos)</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {docs.map(doc => (
          <li key={doc.id} style={{ marginBottom: '10px', borderBottom: '1px dotted gray' }}>
            <p><strong>{doc.titulo}:</strong></p>
            {/* Verifica si la URL de la imagen existe */}
            <p style={{fontSize: '0.8em', color: '#9BA9B8'}}>URL de Imagen: {doc.imagenSrc && doc.imagenSrc.startsWith('https') ? '✅ OK' : '❌ ERROR (gs:// o vacío)'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestFirebaseData;