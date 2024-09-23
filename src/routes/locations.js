const express = require('express');
const { addLocation, getNearbyLocations } = require('../controllers/locationsController');
const router = express.Router();

// Ruta para agregar una ubicación
router.post('/add', addLocation);

// Ruta para obtener ubicaciones cercanas
router.get('/nearby', getNearbyLocations);

module.exports = router;
