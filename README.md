# 🎬 Fandom-tomatoes
_Esta página contien informacion de como consumir el API de reseñas de peliculas, no de su instalacion por el momento_.

## Comenzando 
El API de Fandom-tomatoes es un servicio que te permite registrar **peliculas**, **plataformas** y sus respectivas **reseñas**.

---

### requisitos 📋
_Para acceder a cualquier recurso que presentaremos poco mas adelante se debe agregar a la ruta el indicativo de api y la version "**/api/v1**" (solamente esta disponible la v1) entre el **host** y el **recurso** deseado, como vemos en el siguiente ejemplo:_
```
https://host-ejemplo.io/api/v1/movies
```

## Actualmente en esta API puedes

|Numero| Recurso | Metodo HTTP | Endpoint |Descripción|
| ------ | ------ | ------ |------ |-----|
|1| Plataformas | POST |/platforms|**Crear** nueva plataforma|
|2| Plataformas | GET |/platforms|**Obtener** listado de plataformas|
|3| Plataformas | GET |/platforms/get-icon/:icon|**Obtener** el icono de la plataforma|
|4| Paliculas | POST |/movies|**Crea** nueva pelicula|
|5| Paliculas | GET |/movies|**Obtener** listado de peliculas|
|6| Paliculas | GET |/movies/:id|**Obtener** un pelicula especifica|
|7| Paliculas | PUT |/movies/:id|**Actualizar** una pelicula especifica|
|8| Paliculas | DELETE |/movies/:id|**Eliminar** una pelicula|
|9| Paliculas | POST |/movies/clone/:id|**clonar** una pelicula|
|10| Paliculas | GET |/movies/get-image/:image|**Obtener** imagen de una pelicula|
|11| reviews | POST |/reviews|**Crear** nueva reseña|

---

## 1 POST: Crear nueva plataforma

_Definicion_

>https://host-ejemplo.io/api/v1/platforms

# Parametros
Body Params
- **file: File** 
_Icono de la plataforma.(imagen local que se desea almacenar en el servidor) Ejemplo: netflix-icon.jpg_
- **title: String**
_Nombre de la plataforma. Ejemplo: Netflix_

---

## 2 GET: Obtener listado de plataformas

_Definicion_

>https://host-ejemplo.io/api/v1/platforms

_Sin parametros adicion_

---

## 3 GET: Obtener el icono de la plataforma

_Definicion_

>https://host-ejemplo.io/api/v1/platforms/get-icon/:icon

# Parametros
Path Params
- **icon: String** 
_nombre completo de la imagen que se desea obtener. Ejemplo: image123.jpg_

---

## 4 POST: Crea nueva pelicula

_Definicion_

>https://host-ejemplo.io/api/v1/movie

# Parametros
Body Params

- **title: String**
_Nombre de la película. Ejemplo: Spiderman 2: El Retorno_
- **slug: String**
_URL de la película basado en el título. Ejemplo: spiderman-2-el-retorno_
- **file: File** 
_Logo o imagen principal de la película.(imagen local que se desea almacenar en el servidor) Ejemplo: spiderman-2.jpg_
- **director: String**
_Nombre del director._
- **platforms: Array de strings**
_Array con las plataformas en las que se encuentra la película (id entre comillas dobles ""). Ejemplo ["62476c4dd7e347c6baecf607","62476c59d7e347c6baecf609"]_

---

## 5 GET: Obtener listado de peliculas

_Definicion_

>https://host-ejemplo.io/api/v1/movies

# Parametros
Query Params
- **page: Number** 
_Numero  de la pagina que se desea consultar.(parametro no obligatorio, por defecto es 1)_
- **limit: Number** 
_limite de elementos por pagina.(parametro no obligatorio, por defecto es 10)_

---

## 6 GET: 	Obtener una pelicula especifica

_Definicion_

>https://host-ejemplo.io/api/v1/movies/:id

# Parametros
Path Params
- **id: String | ObjectId** 
_id de la pelicula que se desea consulta. Ej: 6241160554f8daf8409dd7c5_

---

## 7 PUT: Actualizar una pelicula especifica

_Definicion_

>https://host-ejemplo.io/api/v1/movie/:id

# Parametros
Path Params
- **id: String | ObjectId** 
_id de la pelicula que se desea actualizar. Ej: 6241160554f8daf8409dd7c5_

Body Params
- **title: String**
_Nombre de la película. Ejemplo: Spiderman 2: El Retorno_
- **slug: String**
_URL de la película basado en el título. Ejemplo: spiderman-2-el-retorno_
- **file: File** 
_Logo o imagen principal de la película.(imagen local que se desea almacenar en el servidor) Ejemplo: spiderman-2.jpg_
- **director: String**
_Nombre del director._
- **platforms: Array de strings**
_Array con las plataformas en las que se encuentra la película (id entre comillas dobles ""). Ejemplo ["62476c4dd7e347c6baecf607","62476c59d7e347c6baecf609"]_

---

## 8 DELETE: Eliminar una pelicula

_Definicion_

>https://host-ejemplo.io/api/v1/movie/:id

# Parametros
Path Params
- **id: String | ObjectId** 
_id de la pelicula que se desea eliminar. Ej: 6241160554f8daf8409dd7c5_

---

## 9 POST: clonar una pelicula

_Definicion_

>https://host-ejemplo.io/api/v1/movie/clone/:id

# Parametros
Path Params
- **id: String | ObjectId** 
_id de la pelicula que se desea clonar. Ej: 6241160554f8daf8409dd7c5_

---

## 10 GET: Obtener imagen de una pelicula

_Definicion_

>https://host-ejemplo.io/api/v1/movie/get-image/:image

# Parametros
Path Params
- **image: String** 
_nombre completo de la imagen que se desea obtener. Ejemplo: image123.jpg_

---

## 11 POST: Crear nueva reseña

_Definicion_

>https://host-ejemplo.io/api/v1/reviews

# Parametros
Body Params
- **movie: String | ObjectId** 
_ID de la película sobre la que se va a reseñar. Ej: 6241160554f8daf8409dd7c5_
- **platform: String | ObjectId** 
_ID de la plataforma sobre la que se va a reseñar. Ej: 6241160554f8daf8409dd7c5_
-**author: String | ObjectId**
_Nombre del autor o usuario que está creando la reseña._
-**body: String**
_Texto de la reseña._
-**score: Number**
_Calificación 0 a 5 de la reseña._
---
## Construido con 🛠️

_Tecnologias utilizadas_

* [Express](https://expressjs.com/es/) - Libreria gestion del API
* [Mongoose](https://mongoosejs.com/) - ORM utilizado para la gestion de BD
* [MongoDB](https://www.mongodb.com/) - Base de datos
* [MongoDB Atlas](https://www.mongodb.com/atlas/database) - Almacenamiento en la nube
* [Multer](https://www.npmjs.com/package/multer) - Libreria para la subida de archivos
* [Sharp](https://www.npmjs.com/package/sharp) - redimensionamiento de imagenes

---
## Autores ✒️

* **David Alejandro Saenz Meneses** - *Desarrollo Full Stack* 
