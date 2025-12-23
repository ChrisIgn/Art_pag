import './App.css';
//import Tarjeta from './components/molecules/Tarjeta';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage'; // 👈 Importar la página Admin
import LoginPage from './pages/LoginPage'; // 👈 Importar
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Ruta raíz para el Home Page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Ruta para el Panel de Administración */}
        <Route path="/admin" element={<ProtectedRoute> <AdminPage />
      </ProtectedRoute>} />
        
        {/* Opcional: Ruta 404 (para cualquier otra ruta no definida) */}
        <Route path="*" element={<h1 style={{color: 'white', padding: '100px', textAlign: 'center'}}>404: Página No Encontrada</h1>} />
      </Routes>
    </div>
  );
}
export default App;