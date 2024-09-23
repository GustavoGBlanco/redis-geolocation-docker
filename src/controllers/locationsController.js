// Importar funciones del servicio Redis para agregar y obtener ubicaciones
const { addLocationToRedis, getLocationsFromRedis } = require('../services/redisService');

// Controlador para agregar una ubicación
// Maneja las solicitudes para agregar nuevas ubicaciones a Redis
const addLocation = async (req, res) => {
    try {
        // Extraer los datos de la solicitud: nombre, latitud y longitud
        const { name, latitude, longitude } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!name || !latitude || !longitude) {
            return res.status(400).send('Missing required fields: name, latitude, and longitude');
        }

        // Llamar al servicio para agregar la ubicación a Redis
        await addLocationToRedis(name, latitude, longitude);

        // Responder con un mensaje de éxito
        res.status(200).send('Location added successfully');
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error('Error adding location:', error.message);
        res.status(500).send('Error adding location');
    }
};

// Controlador para obtener ubicaciones cercanas
// Maneja las solicitudes para buscar ubicaciones cercanas a una coordenada dada
const getNearbyLocations = async (req, res) => {
    try {
        // Extraer los parámetros de la consulta: longitud, latitud y radio
        const { longitude, latitude, radius } = req.query;

        // Validar que todos los parámetros requeridos estén presentes
        if (!longitude || !latitude || !radius) {
            return res.status(400).send('Missing required query parameters: longitude, latitude, and radius');
        }

        // Llamar al servicio para obtener ubicaciones cercanas desde Redis
        const locations = await getLocationsFromRedis(longitude, latitude, radius);

        // Comprobar si se encontraron ubicaciones; si no, devolver un mensaje de error
        if (!locations || locations.length === 0) {
            return res.status(404).send('No nearby locations found');
        }

        // Responder con las ubicaciones encontradas en formato JSON
        res.status(200).json(locations);
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error('Error fetching locations:', error.message);
        res.status(500).send('Error fetching locations');
    }
};

// Exportar los controladores para ser usados en las rutas de la API
module.exports = {
    addLocation,
    getNearbyLocations,
};