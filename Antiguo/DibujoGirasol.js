// src/components/organisms/DibujoGirasol.js

import React, { useRef, useState, useEffect, useCallback } from 'react';

// --- MODO 'rgbToHex' FUERA ---
// Esta función no depende del estado ni de las props,
// así que la movemos fuera del componente para que no se vuelva a crear.
const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
};

const DibujoGirasol = () => {
    // --- 1. Hooks de React ---
    
    const canvasRef = useRef(null);
    const animationIntervalRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    // --- 2. Lógica de la Animación (con useCallback) ---
    
    // Envolvemos la función en 'useCallback'
    const dibujarRosasDesdeJSON = useCallback(async () => {
        // Asegurarnos de que el canvas exista ANTES de intentar dibujar
        const canvas = canvasRef.current;
        if (!canvas) return; 
        
        const ctx = canvas.getContext('2d');
        
        // Limpiar lienzo
        ctx.setTransform(1, 0, 0, 1, 0, 0); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let regions;
        try {
            const response = await fetch('./rosas.json'); 
            if (!response.ok) {
                throw new Error(`Error al cargar rosas.json: ${response.statusText}`);
            }
            regions = await response.json();
        } catch (error) {
            console.error(error);
            alert("Error: No se pudo cargar 'rosas.json'. ¿Está en la carpeta 'public'?");
            return;
        }

        // ... (lógica de cálculo de escala y centro) ...
        const all_points = regions.flatMap(r => r.contour);
        const min_x = Math.min(...all_points.map(p => p[0]));
        const max_x = Math.max(...all_points.map(p => p[0]));
        const min_y = Math.min(...all_points.map(p => p[1]));
        const max_y = Math.max(...all_points.map(p => p[1]));

        const data_width = max_x - min_x;
        const data_height = max_y - min_y;
        const data_center_x = (min_x + max_x) / 2;
        const data_center_y = (min_y + max_y) / 2;

        const { width: canvasWidth, height: canvasHeight } = canvas;
        const canvas_center_x = canvasWidth / 2;
        const canvas_center_y = canvasHeight / 2;
        
        const scale = Math.min(canvasWidth / data_width, canvasHeight / data_height) * 0.95;

        const transformPoint = (p) => ({
            x: canvas_center_x + (p[0] - data_center_x) * scale,
            y: canvas_center_y + (p[1] - data_center_y) * scale
        });

        // --- Inicio de la Animación ---
        let regionIndex = 0;
        animationIntervalRef.current = setInterval(() => {
            if (regionIndex < regions.length) {
                const region = regions[regionIndex];
                const points = region.contour;
                const color = rgbToHex(region.color[0], region.color[1], region.color[2]);

                ctx.fillStyle = color;
                ctx.strokeStyle = color; 
                ctx.lineWidth = 1;
                ctx.beginPath();

                const startPoint = transformPoint(points[0]);
                ctx.moveTo(startPoint.x, startPoint.y);

                for (let i = 1; i < points.length; i++) {
                    const nextPoint = transformPoint(points[i]);
                    ctx.lineTo(nextPoint.x, nextPoint.y);
                }
                
                ctx.closePath(); 
                ctx.fill(); 

                regionIndex++; 
            } else {
                clearInterval(animationIntervalRef.current);
                animationIntervalRef.current = null;
            }
        }, 20); 
    }, []); // <-- Añadimos el array de dependencias vacío a 'useCallback'


    // --- 3. Hook useEffect (Corregido) ---
    useEffect(() => {
        if (isModalOpen) {
            setTimeout(dibujarRosasDesdeJSON, 10);
        }

        // Función de limpieza
        return () => {
            if (animationIntervalRef.current) {
                clearInterval(animationIntervalRef.current);
                animationIntervalRef.current = null;
            }
        };
    // Añadimos 'dibujarRosasDesdeJSON' al array de dependencias
    }, [isModalOpen, dibujarRosasDesdeJSON]);


    // --- 4. Funciones para controlar el Modal ---
    const abrirModal = () => {
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
    };


    // --- 5. El JSX (lo que se muestra en pantalla) ---
    return (
        <section style={styles.contenedorPrincipal}>
            
            {/* Aquí puedes cambiar el nombre del botón */}
            <button 
                onClick={abrirModal} 
                style={styles.botonAbrir}
            >
                🌹 ola amor la amo mucho 🖤
            </button>
            
            {isModalOpen && (
                
                <div style={styles.overlay} onClick={cerrarModal}>
                    
                    <div style={styles.modalContenido} onClick={(e) => e.stopPropagation()}>
                        
                        <button style={styles.botonCerrar} onClick={cerrarModal}>
                            &times;
                        </button>

                        {/* Aquí puedes cambiar el título del modal */}
                        <h3 style={{ textAlign: 'center', margin: '0 0 15px' }}>
                            Rosa
                        </h3>
                        
                        <canvas 
                            ref={canvasRef} 
                            width="400" 
                            height="400"
                            style={styles.canvas}
                        ></canvas>
                    </div>
                </div>
            )}
        </section>
    );
};

// --- 6. Objeto de Estilos ---
const styles = {
    contenedorPrincipal: {
        textAlign: 'center', 
        padding: '40px 0'
    },
    botonAbrir: {
        fontSize: '1.3em', 
        padding: '12px 25px', 
        cursor: 'pointer',
        backgroundColor: '#c0392b', 
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modalContenido: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        position: 'relative',
        boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
    },
    botonCerrar: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: '#eee',
        border: 'none',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        fontSize: '20px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    canvas: {
        border: '2px solid #333',
        backgroundColor: 'black'
    }
};

export default DibujoGirasol;