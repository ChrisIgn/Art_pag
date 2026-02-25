// src/components/molecules/ContactoForm.jsx
import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './ContactoForm.css';

const ContactoForm = () => {
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '', discordUser: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');


    const DISCORD_WEBHOOK_URL = process.env.REACT_APP_DISCORD_WEBHOOK;

    try {
        // 1. Guardamos en Firebase (lo que ya teníamos)
        await addDoc(collection(db, 'mensajes'), {
            ...formData,
            fecha: serverTimestamp(),
            leido: false
        });

        // 2. Notificación a Discord
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: "🔔 **¡Nueva Solicitud de Comisión!**",
                embeds: [{
                    title: `Mensaje de ${formData.nombre}`,
                    color: 4886498, // Color azul
                    fields: [
                        { name: "Email", value: formData.email, inline: true },
                        { name: "Mensaje", value: formData.mensaje },
                        { name: "Usuario de Discord", value: formData.discordUser || "No proporcionado", inline: true }
                    ],
                    footer: { text: "Enviado desde Erii Art Web" }
                }]
            })
        });

        // 2. Lógica de WhatsApp
        const miTelefono = "56968568045"; // Tu número con código de país
        const textoWA = `Hola Erii Art Web! Tienes una nueva solicitud de comisión:%0A%0A*Nombre:* ${formData.nombre}%0A*Email:* ${formData.email}%0A*Mensaje:* ${formData.mensaje}`;
        
        // Abrir WhatsApp en una nueva pestaña
        window.open(`https://wa.me/${miTelefono}?text=${textoWA}`, '_blank');

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
                <input 
                    type="text" 
                    placeholder="Tu Usuario de discord(opcional) Ej:erii_art o erii#1234"
                    value={formData.discordUser}
                    onChange={(e) => setFormData({...formData, discordUser: e.target.value})}
                    className="form-input"
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