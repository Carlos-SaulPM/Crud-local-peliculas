# Crud de películas local (Con vistas)

Crud sencillo para crear, obtener, actualizar y eliminar.

## Curls de POSTMAN

### Obtener películas
```cURL
curl --location 'http://localhost:3000/api/peliculas'
```

### Obtener película por Id

```cURL
curl --location 'http://localhost:3000/api/pelicula/1'
```

### Crear película

```cURL
curl --location 'http://localhost:3000/api/pelicula/crear' \
--header 'Content-Type: application/json' \
--data '{
    "titulo": "Matrix",
    "fecha": "2023/04/23",
    "sinopsis": "El señor Anderson ..."
}'
```

### Modificar película
```cURL
curl --location 'http://localhost:3000/api/pelicula/modificar/1' \
--data '{
    "titulo": "sdfsdf",
    "fecha": "2023/04/23",
    "sinopsis": "El señor Anderson ...",
    "visto": false
}'
```