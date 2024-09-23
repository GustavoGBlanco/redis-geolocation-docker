// Importa el módulo Express para crear la aplicación del servidor
const express = require('express');

// Importa el módulo Path para trabajar con rutas de archivos y directorios
const path = require('path');

// Importa las rutas de ubicaciones desde el archivo correspondiente
const locationRoutes = require('./routes/locations');

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para parsear JSON
// Permite que el servidor procese datos en formato JSON en las solicitudes
app.use(express.json());

// Middleware para servir archivos estáticos
// Sirve archivos estáticos desde la carpeta 'public' (como imágenes, CSS, JS) para ser accedidos desde el cliente
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
// Define el prefijo '/api/locations' para las rutas relacionadas con ubicaciones
// Redirige todas las solicitudes que empiecen con '/api/locations' al router de 'locationRoutes'
app.use('/api/locations', locationRoutes);

// Exporta la instancia de la aplicación para que pueda ser utilizada por otros módulos, como el servidor principal
module.exports = app;
