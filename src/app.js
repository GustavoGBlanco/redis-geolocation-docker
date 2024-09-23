const express = require('express');
const path = require('path');
const locationRoutes = require('./routes/locations');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/locations', locationRoutes);

module.exports = app;
