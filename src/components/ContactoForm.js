// src/components/molecules/ContactoForm.jsx
import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './ContactoForm.css';

const ContactoForm = () => {
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await addDoc(collection(db, 'mensajes'), {
                ...formData,
                fecha: serverTimestamp(),
                leido: false
            });
            setStatus('success');
            setFormData({ nombre: '', email: '', mensaje: '' });
        } catch (error) {
            console.error("Error:", error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="contact-success-reveal">
                <p>✨ Tu mensaje ha cruzado el Éter con éxito. Te responderé pronto.</p>
                <button onClick={() => setStatus('idle')} className="contact-btn-small">Enviar otro</button>
            </div>
        );
    }

    return (
        <form className="contacto-form-pro" onSubmit={handleSubmit}>
            <div className="input-group-glass">
                <input 
                    type="text" 
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required 
                />
            </div>
            <div className="input-group-glass">
                <input 
                    type="email" 
                    placeholder="Tu email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                />
            </div>
            <div className="input-group-glass">
                <textarea 
                    placeholder="Cuéntame sobre tu proyecto o comisión..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    required 
                />
            </div>
            <button type="submit" className="contact-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando...' : 'Enviar al Éter'}
            </button>
            {status === 'error' && <p className="error-text">Hubo un error. Intenta de nuevo.</p>}
        </form>
    );
};

export default ContactoForm;