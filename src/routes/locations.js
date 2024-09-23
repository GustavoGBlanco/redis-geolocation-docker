// Importa el módulo Express para crear un servidor y gestionar las rutas
const express = require('express');

// Importa las funciones del controlador de ubicaciones: addLocation y getNearbyLocations
// addLocation: se encarga de agregar una nueva ubicación a la base de datos
// getNearbyLocations: busca y devuelve las ubicaciones cercanas a un punto dado
const { addLocation, getNearbyLocations } = require('../controllers/locationsController');

// Crea un enrutador utilizando Express para manejar las rutas relacionadas con ubicaciones
const router = express.Router();

// Ruta para agregar una ubicación
// Método POST: se utiliza para enviar los datos de la ubicación al servidor
// Endpoint: /add - llama a la función addLocation para procesar la solicitud
router.post('/add', addLocation);

// Ruta para obtener ubicaciones cercanas
// Método GET: se utiliza para solicitar datos de ubicaciones cercanas al servidor
// Endpoint: /nearby - llama a la función getNearbyLocations para devolver las ubicaciones cercanas
router.get('/nearby', getNearbyLocations);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;

