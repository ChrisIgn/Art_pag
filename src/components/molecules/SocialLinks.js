// src/components/molecules/SocialLinks.jsx
import React from 'react';
import { FaInstagram, FaTwitter, FaArtstation, FaDiscord } from 'react-icons/fa';
import './SocialLinks.css';

const SocialLinks = () => {
    const redes = [
        { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com/tu_usuario', color: '#E1306C' },
        { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com/tu_usuario', color: '#1DA1F2' },
        { name: 'ArtStation', icon: <FaArtstation />, url: 'https://artstation.com/tu_usuario', color: '#13AFF0' },
        { name: 'Discord', icon: <FaDiscord />, url: 'https://discord.com/invite/tu_server', color: '#5865F2' },
    ];

    return (
        <div className="social-container">
            {redes.map((red) => (
                <a 
                    key={red.name} 
                    href={red.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon-card"
                    style={{ '--hover-color': red.color }}
                >
                    {red.icon}
                    <span className="social-tooltip">{red.name}</span>
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;