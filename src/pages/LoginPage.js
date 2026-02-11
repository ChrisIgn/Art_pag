import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin'); // Si entra bien, lo mandamos al admin
        } catch (err) {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Acceso Admin</h2>
                {error && <p className="login-error">{error}</p>}
                <input 
                    type="email" 
                    placeholder="Tu correo" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="login-input" 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="login-input" 
                />
                <button type="submit" className="login-button">Entrar</button>
              <div className="admin-actions">
                  <a className="admin-backlink" href="/">
                    &larr; Volver al Home
                  </a>
              </div>   
            </form>
        </div>
    );
};

export default LoginPage;