# Erii Art Web - Portafolio Dinámico & Custom CMS

Una Single Page Application (SPA) desarrollada para gestionar un portafolio artístico, tarifas de comisiones y lore de personajes originales (OCs). 

A diferencia de un portafolio estático tradicional, este proyecto cuenta con un Panel de Administración (CMS) 100% a medida, construido con React y Firebase, que permite la gestión del contenido en tiempo real sin necesidad de tocar el código fuente.

🔗 [Ver Proyecto en Vivo](https://tu-enlace-de-netlify.netlify.app)

#  Características Principales

# Interfaz Pública (UI/UX)
* Diseño Inmersivo: Temas dinámicos impulsados por CSS Variables y efectos de *Glassmorphism*. El fondo y la paleta de colores reaccionan a las interacciones del usuario (ej. cambiar entre la fase "Pura" y "Caída" de un personaje).
* Scroll Reveal: Animaciones fluidas al hacer scroll utilizando la API nativa `Intersection Observer`.
* Carrusel Dinámico de Personajes: Renderizado interactivo de OCs extraídos directamente de la base de datos.
* Buzón de Contacto: Formulario renderizado mediante React Portals para evitar conflictos de apilamiento (z-index), conectado directamente al entorno de Firebase.

# Panel de Administración (CMS Privado)
* Gestor de Galerías y Personajes: Operaciones CRUD completas. Subida de imágenes a la nube con previsualización en tiempo real.
* Control de Tarifas: Modificación de precios y estado de comisiones (Abiertas/Cerradas) al instante.
* Bandeja de Entrada: Sistema de lectura y gestión de mensajes enviados por clientes.

# Arquitectura y Seguridad

El proyecto implementa prácticas de seguridad de nivel de producción:
* Control de Acceso Basado en Roles (RBAC): Reglas estrictas en Firestore y Storage. Solo el UID del administrador principal tiene permisos de escritura (`write`).
* Modo Demo (Solo Lectura): Un usuario de demostración que permite a los visitantes explorar la interfaz del panel de control con los botones de mutación (guardar/borrar) visualmente bloqueados e interceptados.
* Auto-Logout (Idle Timeout): Un Custom Hook que cierra automáticamente la sesión del administrador tras 15 minutos de inactividad utilizando los listeners de eventos del navegador.
* Protección de Credenciales: Variables de entorno (`.env`) para resguardar la configuración de la API.

# Stack Tecnológico

* Frontend: React.js (Hooks funcionales, Portals), CSS3 (Nativo, sin librerías externas para máximo control del layout).
* Backend as a Service (BaaS): Firebase.
  * *Firestore:* Base de datos NoSQL en tiempo real.
  * *Cloud Storage:* Alojamiento de assets pesados e imágenes.
  * *Authentication:* Gestión de sesiones y seguridad.

# Acceso Demo para Reclutadores

Puedes explorar el Panel de Administración interactivo sin riesgo de modificar la base de datos de producción ingresando con las siguientes credenciales de Solo Lectura:

* Ruta: `tusitio.com/admin` (o a través del enlace oculto en el footer).
* Email: `demo@eriiart.com`
* Contraseña: `demo1234567`

# Instalación Local

Si deseas correr este proyecto en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/tu-repo.git](https://github.com/tu-usuario/tu-repo.git)