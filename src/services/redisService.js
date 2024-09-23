const redis = require('redis');

// Configuración del cliente Redis
const client = redis.createClient({
    // url: 'redis://localhost:6379',
    url: 'redis://redis-server:6379',
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 5) {
                return new Error('Max retries reached');
            }
            return 1000;
        }
    }
});

client.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => {
        console.error('Failed to connect to Redis:', err);
        process.exit(1);
    });

// Función para agregar ubicación a Redis
const addLocationToRedis = async (name, latitude, longitude) => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lon)) {
        throw new Error('Invalid latitude or longitude');
    }
    await client.geoAdd('locations', { longitude: lon, latitude: lat, member: name });
};

// Función para obtener ubicaciones cercanas desde Redis
const getLocationsFromRedis = async (longitude, latitude, radius) => {
    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);
    const rad = parseFloat(radius);
    if (isNaN(lon) || isNaN(lat) || isNaN(rad)) {
        throw new Error('Invalid parameter values: longitude, latitude, and radius must be numbers');
    }
    return await client.geoSearch('locations', { longitude: lon, latitude: lat }, { radius: rad, unit: 'km' });
};

module.exports = {
    addLocationToRedis,
    getLocationsFromRedis,
};
