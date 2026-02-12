// src/components/UploadArtworkForm.jsx
import React, { useState } from 'react';
import { db } from '../firebase/config'; // Importa tu instancia de Firestore
import { collection, addDoc } from 'firebase/firestore'; // Funciones para añadir documentos
import { storage } from '../firebase/config'; // Importa tu instancia de Storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Funciones para Storage

const UploadArtworkForm = () => {
  const [titulo, setTitulo] = useState('');
  const [file, setFile] = useState(null); // Para el archivo de imagen
  const [categoriasInput, setCategoriasInput] = useState(''); // Para el input de categorías (ej: "Bri, Galery")
  const [descripcion, setDescripcion] = useState(''); // Puedes añadir un campo de descripción si quieres
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [progresoSubida, setProgresoSubida] = useState(0); // Para mostrar el % de subida
  // ... otros estados
  const [tipoImagen, setTipoImagen] = useState('galeria'); // Nuevo: galeria, oc_pure o oc_fallen
  
  const handleFileChange = (e) => {
    // Solo permitimos un archivo a la vez
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError(null);
    setCargando(true);
    setProgresoSubida(0);

    if (!file || !titulo || !categoriasInput || !setDescripcion) {
      setError('Por favor, rellena todos los campos.');
      setCargando(false);
      return;
    }
    
    // 1. Convertir la cadena de categorías a un array
    const categoriasArray = categoriasInput.split(',').map(cat => cat.trim()).filter(cat => cat !== '');

    // 2. Subir la imagen a Firebase Storage
    const storageRef = ref(storage, `obras/${file.name}`); // Crea una referencia en 'obras/nombre-del-archivo'
    const uploadTask = uploadBytesResumable(storageRef, file); // Inicia la subida
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Monitorear el progreso de la subida
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgresoSubida(progress);
      },
      (uploadError) => {
        // Manejar errores de subida
        setError('Error al subir la imagen: ' + uploadError.message);
        setCargando(false);
      },
      async () => {
        // 3. Una vez que la imagen se ha subido, obtenemos su URL de descarga
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
      try {
        await addDoc(collection(db, 'obras'), {
          titulo: titulo,
          descripcion: descripcion,
          imagenSrc: downloadURL,
          categorias: categoriasArray,
          tipo: tipoImagen, // 👈 AÑADIMOS ESTO
          createdAt: new Date(),
        });
  
  // Al limpiar el formulario, reseteamos también el tipo
  setTipoImagen('galeria');
        
        
          // 5. Limpiar el formulario y mostrar éxito
          setTitulo('');
          setFile(null);
          setCategoriasInput('');
          setDescripcion('');
          setProgresoSubida(0);
          setError(null);
          setCargando(false);
          alert('¡Obra subida con éxito!'); // Mensaje de éxito
          
          // Opcional: Recargar los datos de la galería en HomePage si usas el hook
          // Esto se hará automáticamente si HomePage usa useFirestore y este cambia.

        } catch (dbError) {
          setError('Error al guardar en la base de datos: ' + dbError.message);
          setCargando(false);
        }
      }
    );
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Subir Nueva Obra de Arte</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        
        <div style={inputGroupStyle}>
          <label htmlFor="titulo" style={labelStyle}>Título:</label>
          <input 
            type="text" 
            id="titulo"
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            style={inputStyle}
            disabled={cargando}
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="descripcion" style={labelStyle}>Descripción:</label>
          <input
            type="text" 
            id="titulo"
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            style={inputStyle}
            disabled={cargando}
          />
         </div>
        <div style={inputGroupStyle}>
          <label htmlFor="file" style={labelStyle}>Imagen:</label>
          <input 
            type="file" 
            id="file"
            onChange={handleFileChange} 
            style={fileInputStyle}
            disabled={cargando}
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="categorias" style={labelStyle}>Categorías (separadas por comas):</label>
          <input 
            type="text" 
            id="categorias"
            value={categoriasInput} 
            onChange={(e) => setCategoriasInput(e.target.value)} 
            style={inputStyle}
            placeholder="Ej: Bri, Galery, Fanart"
            disabled={cargando}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="tipoImagen" style={labelStyle}>Destino de la Imagen:</label>
          <select 
            id="tipoImagen"
            value={tipoImagen}
            onChange={(e) => setTipoImagen(e.target.value)} 
            style={inputStyle}
            disabled={cargando}
          >
            <option value="galeria">Galería Estándar</option>
            <option value="oc_pure">Imagen Principal: Selene (Pura)</option>
            <option value="oc_fallen">Imagen Principal: Brighella (Caída)</option>
          </select>
          <p style={{fontSize: '0.8em', color: '#9BA9B8', marginTop: '5px'}}>
            * Selecciona una de las opciones "Principal" para cambiar la foto de la sección de Bi.
          </p>
        </div>


        <button type="submit" style={buttonStyle} disabled={cargando}>
          {cargando ? `Subiendo... ${progresoSubida.toFixed(0)}%` : 'Subir Obra'}
        </button>

        {progresoSubida > 0 && progresoSubida < 100 && (
          <div style={progressBarContainerStyle}>
            <div style={{...progressBarFillStyle, width: `${progresoSubida}%`}}></div>
          </div>
        )}

        {error && <p style={errorStyle}>{error}</p>}
      </form>
    </div>
  );
};

// Estilos básicos para el formulario (puedes moverlos a un CSS aparte)
const formContainerStyle = {
  backgroundColor: '#1a2331',
  padding: '30px',
  borderRadius: '10px',
  maxWidth: '500px',
  margin: '50px auto',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  color: '#EAEAEA',
};

const titleStyle = {
  color: '#4A90E2',
  textAlign: 'center',
  marginBottom: '30px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#9BA9B8',
};

const inputStyle = {
  padding: '12px',
  borderRadius: '5px',
  border: '1px solid #3d4f62',
  backgroundColor: '#283747',
  color: '#EAEAEA',
  fontSize: '1em',
};

const fileInputStyle = {
    padding: '12px 0', // Ajustar padding para file input
    borderRadius: '5px',
    border: 'none', // Los file inputs suelen no llevar borde
    backgroundColor: 'transparent', // Fondo transparente
    color: '#EAEAEA',
    fontSize: '1em',
    cursor: 'pointer',
};

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#4A90E2',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1.1em',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#357ABD',
};

const errorStyle = {
  color: '#FF6347',
  backgroundColor: '#FF634720',
  padding: '10px',
  borderRadius: '5px',
  marginTop: '15px',
  textAlign: 'center',
};

const progressBarContainerStyle = {
    width: '100%',
    backgroundColor: '#3d4f62',
    borderRadius: '5px',
    marginTop: '15px',
    overflow: 'hidden',
};

const progressBarFillStyle = {
    height: '10px',
    backgroundColor: '#4CAF50', // Color verde para progreso
    borderRadius: '5px',
    transition: 'width 0.3s ease-in-out',
};

export default UploadArtworkForm;