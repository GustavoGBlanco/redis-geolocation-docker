const { addLocationToRedis, getLocationsFromRedis } = require('../services/redisService');

// Controlador para agregar una ubicación
const addLocation = async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;
        if (!name || !latitude || !longitude) {
            return res.status(400).send('Missing required fields: name, latitude, and longitude');
        }
        await addLocationToRedis(name, latitude, longitude);
        res.status(200).send('Location added successfully');
    } catch (error) {
        console.error('Error adding location:', error.message);
        res.status(500).send('Error adding location');
    }
};

// Controlador para obtener ubicaciones cercanas
const getNearbyLocations = async (req, res) => {
    try {
        const { longitude, latitude, radius } = req.query;
        if (!longitude || !latitude || !radius) {
            return res.status(400).send('Missing required query parameters: longitude, latitude, and radius');
        }
        const locations = await getLocationsFromRedis(longitude, latitude, radius);
        if (!locations || locations.length === 0) {
            return res.status(404).send('No nearby locations found');
        }
        res.status(200).json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error.message);
        res.status(500).send('Error fetching locations');
    }
};

module.exports = {
    addLocation,
    getNearbyLocations,
};
