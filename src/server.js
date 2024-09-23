// Importa la aplicación configurada desde el archivo 'app.js'
const app = require('./app');

// Define el puerto en el que el servidor escuchará las solicitudes
const port = 3000;

// Inicia el servidor y lo pone a escuchar en el puerto especificado
app.listen(port, () => {
    // Mensaje de confirmación en la consola indicando que el servidor está corriendo
    console.log(`Server is running on http://localhost:${port}`);
})
    // Manejo de errores en caso de que falle al intentar iniciar el servidor
    .on('error', (err) => {
        // Muestra el error en la consola
        console.error('Failed to start server:', err);
        // Sale del proceso con un código de error
        process.exit(1);
    });
