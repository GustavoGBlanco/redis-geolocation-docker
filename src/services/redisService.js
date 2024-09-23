// Importa el módulo Redis para manejar la conexión y operaciones con la base de datos Redis
const redis = require('redis');

// Configuración del cliente Redis
// Crea una instancia del cliente Redis con la URL del servidor Redis y una estrategia de reconexión personalizada
const client = redis.createClient({
    // URL de conexión al servidor Redis (puede ser local o en otro servidor)
    // url: 'redis://localhost:6379', // URL comentada como referencia - usar cuando lo haga local sin docker
    url: 'redis://redis-server:6379', // URL del servidor Redis en uso - usar cuando lo haga con docker
    socket: {
        // Estrategia de reconexión personalizada
        // Intenta reconectar hasta 5 veces con una espera de 1000 ms entre intentos
        reconnectStrategy: (retries) => {
            if (retries > 5) {
                // Si se superan los 5 intentos, lanza un error indicando que se alcanzaron los máximos intentos
                return new Error('Max retries reached');
            }
            return 1000; // Espera 1 segundo antes de intentar reconectar
        }
    }
});

// Conexión al cliente Redis
client.connect()
    .then(() => console.log('Connected to Redis')) // Mensaje de éxito al conectar con Redis
    .catch(err => {
        // Manejo de errores si la conexión falla
        console.error('Failed to connect to Redis:', err);
        process.exit(1); // Sale del proceso si no se puede conectar
    });

// Función para agregar una ubicación a Redis
// name: nombre de la ubicación
// latitude: latitud de la ubicación
// longitude: longitud de la ubicación
const addLocationToRedis = async (name, latitude, longitude) => {
    // Convierte los valores de latitud y longitud a números
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    // Verifica que los valores sean números válidos
    if (isNaN(lat) || isNaN(lon)) {
        throw new Error('Invalid latitude or longitude'); // Lanza un error si los valores no son válidos
    }
    // Agrega la ubicación al conjunto geoespacial 'locations' en Redis
    await client.geoAdd('locations', { longitude: lon, latitude: lat, member: name });
};

// Función para obtener ubicaciones cercanas desde Redis
// longitude: longitud del punto de referencia
// latitude: latitud del punto de referencia
// radius: radio de búsqueda en kilómetros
const getLocationsFromRedis = async (longitude, latitude, radius) => {
    // Convierte los valores de longitud, latitud y radio a números
    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);
    const rad = parseFloat(radius);
    // Verifica que todos los valores sean números válidos
    if (isNaN(lon) || isNaN(lat) || isNaN(rad)) {
        throw new Error('Invalid parameter values: longitude, latitude, and radius must be numbers');
    }
    // Busca ubicaciones cercanas dentro del radio especificado en kilómetros
    return await client.geoSearch('locations', { longitude: lon, latitude: lat }, { radius: rad, unit: 'km' });
};

// Exporta las funciones para ser utilizadas en otras partes de la aplicación
module.exports = {
    addLocationToRedis,
    getLocationsFromRedis,
};
