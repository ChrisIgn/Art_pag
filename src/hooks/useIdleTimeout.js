import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config'; // Ajusta la ruta si es necesario

/**
 * Hook para cerrar la sesión automáticamente tras un periodo de inactividad.
 * @param {number} timeoutMinutes - Minutos de inactividad permitidos (por defecto 15)
 */
export const useIdleTimeout = (timeoutMinutes = 15) => {
    useEffect(() => {
        let timeoutId;

        // Función que cierra la sesión
        const logout = async () => {
            try {
                await signOut(auth);
                alert("⏳ Tu sesión en el Éter ha expirado por inactividad. Por seguridad, te hemos desconectado.");
                window.location.href = '/'; // Te redirige al Home
            } catch (error) {
                console.error("Error al cerrar sesión automáticamente:", error);
            }
        };

        // Función que reinicia el cronómetro
        const resetTimer = () => {
            clearTimeout(timeoutId);
            // Convertimos los minutos a milisegundos
            timeoutId = setTimeout(logout, timeoutMinutes * 60 * 1000);
        };

        // Lista de eventos que consideramos como "actividad" del usuario
        const eventosActividad = ['mousemove', 'keydown', 'scroll', 'click'];

        // Escuchamos esos eventos en toda la ventana
        eventosActividad.forEach(evento => {
            window.addEventListener(evento, resetTimer);
        });

        // Iniciamos el cronómetro por primera vez al entrar al Admin
        resetTimer();

        // Limpieza: Cuando salgas del Admin, quitamos los escuchadores para no gastar memoria
        return () => {
            clearTimeout(timeoutId);
            eventosActividad.forEach(evento => {
                window.removeEventListener(evento, resetTimer);
            });
        };
    }, [timeoutMinutes]); 
};