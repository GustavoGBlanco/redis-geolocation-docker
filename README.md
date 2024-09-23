# Redis Geolocation Docker Project

Este proyecto es una aplicación Node.js que utiliza Redis para manejar geolocalización, permitiendo agregar y consultar ubicaciones cercanas. La aplicación puede ejecutarse tanto con Docker como sin Docker, ofreciendo flexibilidad para diferentes entornos de desarrollo.

## Tabla de Contenidos
- [Anatomía del Proyecto](#anatomía-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Configuración del Proyecto](#configuración-del-proyecto)
  - [Uso Sin Docker](#uso-sin-docker)
    - [Paso a Paso](#paso-a-paso-para-uso-sin-docker)
    - [Comandos Esenciales](#comandos-esenciales-sin-docker)
  - [Uso Con Docker](#uso-con-docker)
    - [Paso a Paso](#paso-a-paso-para-uso-con-docker)
    - [Comandos Esenciales](#comandos-esenciales-con-docker)
- [Comandos Redis](#comandos-redis)
- [Notas Adicionales](#notas-adicionales)
- [Contacto](#contacto)

## Anatomía del Proyecto

```
redis-geolocation-docker/
├── docker-compose.yml       # Archivo de configuración de Docker Compose
├── Dockerfile               # Archivo Docker para construir la imagen de la aplicación
├── redis.conf               # Configuración personalizada de Redis
├── .gitignore               # Archivo .gitignore actualizado
├── README.md                # Documentación del proyecto, configuración y comandos
├── src/                     # Carpeta principal de la aplicación
│   ├── app.js               # Archivo principal que configura Express y las rutas
│   ├── server.js            # Archivo para iniciar el servidor Express
│   ├── package.json         # Archivo de configuración de Node.js con las dependencias
│   ├── controllers/         # Controladores que manejan la lógica de las rutas
│   │   └── locationsController.js # Controlador para la lógica de las ubicaciones
│   ├── routes/              # Definición de rutas de la API
│   │   └── locations.js     # Rutas relacionadas con las ubicaciones
│   ├── services/            # Servicios que interactúan con Redis y otros sistemas
│   │   └── redisService.js  # Servicio para la interacción con Redis
│   ├── public/              # Archivos estáticos como HTML, CSS y JS
│   │   └── index.html       # Archivo HTML básico para interactuar con la API
│   └── utils/               # (Opcional) Utilidades adicionales como manejo de errores o validaciones
```

## Requisitos Previos
- **Node.js** y **npm** instalados para ejecutar el proyecto sin Docker.
- **Docker** y **Docker Compose** instalados para ejecutar el proyecto con Docker.
- **Redis** instalado si se ejecuta sin Docker.

## Configuración del Proyecto

### Uso Sin Docker

#### Paso a Paso para Uso Sin Docker

1. **Clonar el repositorio**:

   ```bash
   git clone <URL del repositorio>
   cd redis-geolocation-docker/src
   ```

2. **Instalar las dependencias**:

   Ejecuta el siguiente comando en la carpeta `src` para instalar todas las dependencias de Node.js necesarias:

   ```bash
   npm install
   ```

3. **Configurar Redis**:

   Asegúrate de que Redis esté instalado y ejecutándose en tu máquina. Puedes iniciar Redis usando:

   ```bash
   redis-server
   ```

4. **Configurar la Conexión a Redis**:

   Edita el archivo `src/services/redisService.js` para asegurarte de que la URL de conexión apunte a `localhost:6379`.

5. **Iniciar el Servidor**:

   Una vez configurado, inicia la aplicación con:

   ```bash
   node server.js
   ```

6. **Usar la Aplicación**:

   Visita [http://localhost:3000](http://localhost:3000) para interactuar con la API y la interfaz HTML.

#### Comandos Esenciales Sin Docker

- **Instalar dependencias**: `npm install`
- **Iniciar Redis**: `redis-server`
- **Iniciar el servidor**: `node server.js`

### Uso Con Docker

#### Paso a Paso para Uso Con Docker

1. **Clonar el repositorio**:

   ```bash
   git clone <URL del repositorio>
   cd redis-geolocation-docker
   ```

2. **Construir y Ejecutar los Contenedores**:

   Usa Docker Compose para construir y levantar los contenedores de Redis y la aplicación:

   ```bash
   docker-compose up --build
   ```

   Este comando crea y ejecuta los contenedores basados en las configuraciones del `docker-compose.yml`.

3. **Verificar el Estado de los Contenedores**:

   Asegúrate de que ambos contenedores estén ejecutándose correctamente:

   ```bash
   docker ps
   ```

4. **Usar la Aplicación**:

   Una vez que los contenedores estén en ejecución, visita [http://localhost:3000](http://localhost:3000) para interactuar con la API y la interfaz HTML.

#### Comandos Esenciales Con Docker

- **Construir y ejecutar contenedores**: `docker-compose up --build`
- **Apagar contenedores**: `docker-compose down`
- **Verificar contenedores activos**: `docker ps`
- **Ver logs de la aplicación**: `docker logs redis-app`
- **Acceder al contenedor de la app**: `docker exec -it redis-app bash`

## Comandos Redis

Estos son algunos comandos básicos de Redis que puedes usar para probar y verificar la funcionalidad de geolocalización:

1. **Agregar una ubicación manualmente en Redis**:

   ```bash
   GEOADD locations 2.2945 48.8584 "Torre Eiffel"
   ```

2. **Consultar la posición de una ubicación**:

   ```bash
   GEOPOS locations "Torre Eiffel"
   ```

3. **Buscar ubicaciones cercanas**:

   ```bash
   GEORADIUS locations 2.2945 48.8584 5 km
   ```

4. **Ver todas las ubicaciones agregadas**:

   ```bash
   SMEMBERS locations
   ```

## Notas Adicionales

- Si experimentas problemas con los puertos, asegúrate de que los puertos 3000 y 6379 no estén en uso por otros servicios.
- Para modificar la configuración de Redis, puedes editar el archivo `redis.conf` y reiniciar los contenedores para aplicar los cambios.
- Si necesitas cambiar la configuración de la aplicación o Redis, recuerda reconstruir los contenedores con `docker-compose up --build`.

## Contacto

Para cualquier consulta o soporte adicional, por favor contacta a:

**Nombre:** Gustavo Adolfo García Blanco  
**Email:** [gustavgarcia@me.com](mailto:gustavgarcia@me.com)  
**LinkedIn:** [Perfil de LinkedIn](https://www.linkedin.com/in/gustavogblanco)

---

Este README proporciona una guía completa para la configuración y uso del proyecto Redis Geolocation, asegurando que cualquier usuario pueda seguir los pasos sin complicaciones. Si necesitas más ayuda o quieres sugerir mejoras, no dudes en contactarnos.
