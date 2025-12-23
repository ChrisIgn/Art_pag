import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
        <div style={{ backgroundColor: '#0E1624', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={handleLogin} style={loginFormStyle}>
                <h2 style={{ color: '#4A90E2', textAlign: 'center' }}>Acceso Admin</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <input 
                    type="email" 
                    placeholder="Tu correo" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={inputStyle} 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={inputStyle} 
                />
                <button type="submit" style={buttonStyle}>Entrar</button>
            </form>
        </div>
    );
};

// Estilos rápidos
const loginFormStyle = { display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px', background: '#1a2331', borderRadius: '10px', width: '300px' };
const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #3d4f62', background: '#283747', color: 'white' };
const buttonStyle = { padding: '10px', background: '#4A90E2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default LoginPage;