# Implementación de logger ⚡️

Implementar un logger.

- Primero, definir un sistema de niveles que tenga la siguiente prioridad (de menor a mayor):
  - debug, http, info, warning, error, fatal
- Después implementar un logger para desarrollo y un logger para producción, el logger de desarrollo deberá loggear a partir del nivel debug, sólo en consola
- Sin embargo, el logger del entorno productivo debería loggear sólo a partir de nivel info.
- Además, el logger deberá enviar en un transporte de archivos a partir del nivel de error en un nombre “errors.log”
- Agregar logs de valor alto en los puntos importantes de tu servidor (errores, advertencias, etc) y modificar los console.log() habituales que tenemos para que muestren todo a partir de winston.
- Crear un endpoint /loggerTest que permita probar todos los logs

## Inicio  de sesión

A la hora de iniciar el proyecto en producción hay que modificar la api de peticiones de la carpeta `src/public/js/utils/api.js` reemplazando el puerto 8080 por el puerto 3000

- `ADMIN`:
```
  email: admin@gmail.com
  password: 123
```
- `USUARIO`:
```
  email: user@gmail.com
  password: 123
```

## Estructura del Proyecto

Dentro del proyecto encontrarás la siguiente estructura de directorios:

```
├── src/
    ├── config/
    │   └── ...
    └── controllers/
    │   └── ...
    └── dao/
        └── db/
        │   └── ...
        └── memory/
        │   └── ...
        └── models/
        │   └── ...
        └── mongo/
        │   └── ...
        └── patterns/
        │   └── ...
        └── services/
            └── repository/
                └── ...
    │└── lib/
        └── error/
            └── constants/
            │   └── ...
            └── handler/
                └── ...
    │└── middlewares/
    │   └── ...
    └── public/
    │   └── ...
    └── routes/
    │   └── ...
    └── utils/
    │   └── ...
    └── views/
        └── layouts/
        │   └── ...
        └── partials/
            └── ...
```

- `src/config`: Archivos de configuración
- `src/controllers`: Controladores de las rutas
- `src/dao`: Todo lo relacionado con datos (MEMORY, MONGO)
- `src/dao/memory`: Métodos para guardar los datos en memoria (archivo.json)
- `src/dao/models`: Estructura de los datos de MONGODB
- `src/dao/mongo`: Métodos para guardar los datos en una base de datos mongo
- `src/dao/patterns`: Diseño de los datos de la aplicación
- `src/dao/services`: Servicios
- `src/dao/services/repository`: Selección del dao a utilizar en el proyecto
- `src/lib`: Librerias compartidas
- `src/lib/err`: Libreria de custom error
- `src/lib/err/constants`: Todos los códigos e información de distintos errores
- `src/lib/err/handler`: Manejador de errores
- `src/middlewares`: Funciones de validación
- `src/public`: Carpeta publica para las vistas
- `src/routes`: Rutas de la API
- `src/utils`: Archivos que se reutilizarán a lo largo del proyecto
- `src/views`: Vistas de handlebars para renderizar la interfaz del usuario
- `src/views/layouts`: Plantillas de handlebars
- `src/views/partials`: Componentes de handlebars

## Instalación

```shell
$ npm install # or `pnpm install` or `yarn install`
```

## Configuración del Proyecto con Standard.js
Hubicarse dentro del siguiente directorio

```
├── node_modules/
    ├── standard/
        └── ...
```

En el archivo `eslintrc.json` pegar la siguiente configuración

```JSON
{
  "env": {
    "browser": true
  },
  "extends": ["standard", "standard-jsx"],
  "rules": {
    "camelcase": "off"
  }
}
```


## Desarrollo

```shell
$ npm start # or `pnpm start` or `yarn start`
```

### Parámetros por linea de comando

#### Modo de desarrollo

```shell
$ npm start --mode
```

- `DEVELOPMENT`: Se conecta a la base de datos de desarrollo y el puerto de ejecución del servidor es el 8080 por defecto
- `PRODUCTION`: Se conecta a la base de datos de producción y el puerto de ejecución del servidor es el 3000 por defecto

Por defecto se usa `DEVELOPMENT`

#### Puerto de ejecución del servidor

```shell
$ npm start --port
```

Por defecto se usa el puerto designado por el modo de desarrollo

#### Persistencia de los datos

```shell
$ npm start --persistence
```

- `MONGO`: Los datos se almacenan en una base de datos mongo
- `MEMORY`: Los datos se almacenan en un archivo .json

Por defecto se usa `MONGO`

## Producción

```shell
$ npm build # or `pnpm build` or `yarn build`
```