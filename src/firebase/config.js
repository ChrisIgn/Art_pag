// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVzVBvdoHJQ_w7RvKdI8Pr7cQ6b5tOeoo",
  authDomain: "fishy-art-portafolio.firebaseapp.com",
  projectId: "fishy-art-portafolio",
  storageBucket: "fishy-art-portafolio.firebasestorage.app",
  messagingSenderId: "1096165914828",
  appId: "1:1096165914828:web:b3e0802a369ec417e92a69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Inicializar y exportar los servicios que usaremos
const db = getFirestore(app); // Base de datos
const storage = getStorage(app); // Almacenamiento de imágenes

export { db, storage };