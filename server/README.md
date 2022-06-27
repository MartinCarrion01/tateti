<a name="top"></a>
# Servido de tatetí

Código del servidor del juego donde está contenida la implementación de la lógica del negocio del problema.

- [Jugador](#jugador)
	- [Registrar jugador](#registrar-jugador)
	- [Logear jugador](#logear-jugador)
	- [Mostrar jugador](#mostrar-jugador)
	- [Mostrar partidos activos del jugador](#partido-activo)
	
# <a name='jugador'></a> Jugador

## <a name='registrar-jugador'></a> Registrar jugador
[Back to top](#top)

<p>Registra un jugador en el sistema, con su nombre de usuario y contraseña</p>

	POST /players

### Ejemplos

Body

```
{
  "username" : "usuario",
  "password" : "password"
}
```

### Respuesta exitosa

200 OK

```
HTTP/1.1 200 OK
{
  "player": {
    "_id": {
      "$oid": "62b9450281d6f34dec1a36be"
    },
    "in_game": false,
    "password": "password",
    "username": "username"
  }
}
```

### Respuesta con error

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "{Nombre de la propiedad}": [
      {
        "error": "{Motivo de error"},
        "{Info adicional del error}",
        ...
      },
      ...
      ],
      ...
  }
}
```

## <a name='logear-jugador'></a> Logear jugador
[Back to top](#top)

<p>Logea un jugador, ingresando el usuario y la contraseña del mismo</p>

	POST /players/login

### Ejemplos

Body

```
{
  "username" : "usuario",
  "password" : "password"
}
```

### Respuesta exitosa

200 OK

```
HTTP/1.1 200 OK
{
  "player": {
    "_id": {
      "$oid": "62b9450281d6f34dec1a36be"
    },
    "in_game": false,
    "password": "password",
    "username": "username"
  }
}
```

### Respuesta con error

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "La contraseña ingresada no es correcta"
  }
}
```

404 Not Found

```
HTTP/1.1 404 Not Found
{
  "message": {
    "No existe el jugador ingresado"
  }
}
```

## <a name='mostrar-jugador'></a> Mostrar jugador
[Back to top](#top)

<p>Muestra un jugador según su id</p>

	GET /players/:id

### Ejemplos

### Respuesta exitosa

200 OK

```
HTTP/1.1 200 OK
{
  "player": {
    "_id": {
      "$oid": "62b9450281d6f34dec1a36be"
    },
    "in_game": false,
    "password": "password",
    "username": "username"
  }
}
```

### Respuesta con error

404 Not Found

```
HTTP/1.1 404 Not Found
{
  "message": {
    "No existe el jugador ingresado"
  }
}
```

## <a name='partido-activo'></a> Muestra partido activo del jugador
[Back to top](#top)

<p>Muestra el partido en el que el jugador requerido está jugando actualmente</p>

	GET /players/:id/active_match

### Ejemplos

### Respuesta exitosa

200 OK

```
HTTP/1.1 200 OK
{
  "match": {
    "_id": {
      "$oid": "62b34c9381d6f307d64996bb"
    },
    "is_active": true,
    "match_number": 8591,
    "player1_cells": [],
    "player1_id": {
      "$oid": "62b34c8d81d6f307d64996ba"
    },
    "player2_cells": [],
    "player2_id": {
      "$oid": "62b34be481d6f307d64996b8"
    },
    "status": "juegap1",
    "winner_id": null
  }
}
```

```
HTTP/1.1 200 OK
{
  "match": null
}
```

### Respuesta con error

404 Not Found

```
HTTP/1.1 404 Not Found
{
  "message": {
    "No existe el jugador ingresado"
  }
}
```

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No se encuentra en partida actualmente"
  }
}
```
