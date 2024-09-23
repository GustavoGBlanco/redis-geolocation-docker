# Redis Geolocation Docker Project

Este proyecto es una aplicación Node.js que utiliza Redis para manejar geolocalización, permitiendo agregar y consultar ubicaciones cercanas. La aplicación puede ejecutarse tanto con Docker como sin Docker, ofreciendo flexibilidad para diferentes entornos de desarrollo.

## Tabla de Contenidos
- [Requisitos Previos](#requisitos-previos)
- [Anatomía del Proyecto](#anatomía-del-proyecto)
- [Descripción de los Componentes](#descripción-de-los-componentes)
- [La Estructura del Proyecto y los Patrones de Diseño Utilizados](#la-estructura-del-proyecto-y-los-patrones-de-diseño-utilizados)
    - [Patrones de Arquitectura Utilizados](#patrones-de-arquitectura-utilizados)
    - [Patrones de Diseño Utilizados](#patrones-de-diseño-utilizados)
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

## Requisitos Previos
- **Node.js** y **npm** instalados para ejecutar el proyecto sin Docker.
- **Docker** y **Docker Compose** instalados para ejecutar el proyecto con Docker.
- **Redis** instalado si se ejecuta sin Docker.

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
## Descripción de los Componentes

- **docker-compose.yml**: Define los servicios de Docker, como Redis y la aplicación Node.js, incluyendo la configuración de redes y volúmenes.
- **Dockerfile**: Instrucciones para construir la imagen de la aplicación Node.js, especificando el entorno y las dependencias necesarias.
- **redis.conf**: Archivo de configuración para Redis, permitiendo ajustes personalizados para la base de datos en Docker.
- **.gitignore**: Lista de archivos y carpetas a ignorar por Git, ayudando a mantener el repositorio limpio y seguro.
- **src/**: Carpeta principal de la aplicación que contiene todo el código fuente.
    - **app.js**: Configura Express, los middlewares, y define las rutas que usa la aplicación.
    - **server.js**: Inicia el servidor Express y lo pone en escucha en el puerto especificado.
    - **package.json**: Archivo de configuración de Node.js que lista las dependencias y scripts del proyecto.
    - **controllers/**: Contiene los controladores que manejan la lógica de negocio de las rutas.
        - **locationsController.js**: Controlador que maneja las solicitudes relacionadas con las ubicaciones, como agregar y buscar ubicaciones cercanas.
    - **routes/**: Define las rutas de la API que mapean las solicitudes HTTP a los controladores correspondientes.
        - **locations.js**: Define las rutas para las operaciones de ubicaciones, como /add y /nearby.
    - **services/**: Servicios que encapsulan la lógica para interactuar con sistemas externos como Redis.
        - **redisService.js**: Contiene la lógica para agregar y buscar ubicaciones en la base de datos Redis.
    - **public/**: Contiene archivos estáticos que son servidos directamente, como la interfaz HTML para interactuar con la API.
        - **index.html**: Un archivo HTML básico que permite a los usuarios agregar ubicaciones a través de un formulario.
    - **utils/**: (Opcional) Puede contener funciones auxiliares como validaciones, manejo de errores o cualquier lógica que sea reutilizable.


## La estructura del Proyecto y los Patrones de Diseño Utilizados

La estructura actual del proyecto sigue principios de Arquitectura Modular y aplica varios Patrones de Diseño que ayudan a mantener el código organizado, mantenible y escalable. A continuación, se detallan los patrones de arquitectura y diseño utilizados en la estructura del proyecto:

### Patrones de Arquitectura Utilizados

**Arquitectura Modular:**
- **Descripción**: Esta arquitectura divide el proyecto en módulos independientes, cada uno con una responsabilidad específica. Se busca separar las diferentes capas de la aplicación (rutas, controladores, servicios) para una mayor cohesión interna y menor acoplamiento externo.
- **Dónde se aplica**:
    - **Rutas (routes/)**: Define las rutas de la API y delega la lógica a los controladores.
    - **Controladores (controllers/)**: Encapsulan la lógica de negocio y gestionan las interacciones con los servicios.
    - **Servicios (services/)**: Contienen la lógica para interactuar con sistemas externos como Redis, proporcionando funciones reutilizables.

**Arquitectura de Capas (Layered Architecture):**
- **Descripción**: La aplicación se organiza en capas que separan las responsabilidades:
    - **Capa de Presentación**: Maneja la interfaz de usuario y las interacciones del cliente (e.g., index.html en public/).
    - **Capa de Rutas y Controladores**: Maneja las solicitudes HTTP y la lógica de negocio (rutas en routes/ y controladores en controllers/).
    - **Capa de Servicios**: Gestiona la lógica de acceso a datos y la interacción con Redis (services/redisService.js).
- **Dónde se aplica**:
    - **routes/locations.js**: Define cómo se manejan las solicitudes entrantes y las asigna a los controladores correspondientes.
    - **controllers/locationsController.js**: Actúa como intermediario, controlando la lógica de las solicitudes y las respuestas.
    - **services/redisService.js**: Se encarga de las interacciones con Redis, abstracto del resto de la aplicación.

### Patrones de Diseño Utilizados

**Patrón MVC (Model-View-Controller):**
- **Descripción**: Aunque no se utiliza un "Model" tradicional como en aplicaciones con bases de datos relacionales, el patrón MVC se sigue de forma parcial:
    - **View**: index.html en la carpeta public, maneja la interfaz del usuario.
    - **Controller**: Los controladores en controllers/locationsController.js gestionan la lógica de negocio.
    - **Service (acting as Model)**: En lugar de modelos tradicionales, los servicios (services/redisService.js) actúan como la capa de acceso a datos, interactuando directamente con Redis.
- **Dónde se aplica**:
    - **controllers/locationsController.js**: Controla la interacción entre las rutas y la capa de servicios.
    - **services/redisService.js**: Actúa como la "capa de datos" o lógica del modelo.

**Patrón Facade (Fachada):**
- **Descripción**: El patrón Facade simplifica la interacción con subsistemas complejos, como Redis, ofreciendo una interfaz simplificada.
- **Dónde se aplica**:
    - **services/redisService.js**: Proporciona funciones como addLocationToRedis y getLocationsFromRedis, ocultando la complejidad de la API de Redis.

**Patrón de Inyección de Dependencias:**
- **Descripción**: Aunque no explícitamente mediante un contenedor de inyección de dependencias, la forma en que los servicios y controladores interactúan sin estar directamente acoplados a las rutas se asemeja a este patrón.
- **Dónde se aplica**:
    - **Controladores que dependen de Servicios**: controllers/locationsController.js utiliza funciones del servicio redisService.js sin crear instancias directamente, permitiendo una fácil testabilidad y mantenimiento.

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