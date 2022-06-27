<a name="top"></a>
# Servidor de tatetí

Código del servidor del juego donde está contenida la implementación de la lógica del negocio del problema.

# Índice de endpoints

## Cosas a tener en cuenta

- Para los endpoints del partido, no hay que trabajar con el id único de la partida para el parámetro de la consulta, si no que hay que trabajar con el atributo "match_number" que es un entero de 6 digitos

## Endpoints

- [Jugador](#jugador)
	- [Registrar jugador](#registrar-jugador)
	- [Logear jugador](#logear-jugador)
	- [Mostrar jugador](#mostrar-jugador)
	- [Mostrar partidos activos del jugador](#partido-activo)
- [Partido](#partido)
	- [Crear un nuevo partido](#crear-partido)
	- [Unirse a un partido](#unirse-partido)
	- [Refrescar partido](#refrescar-partido)
	- [Hacer jugada](#hacer-jugada)
	- [Abandonar partido](#abandonar-partido)
	
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

# <a name='partido'></a> Partido

## <a name='crear-partido'></a> Crear un partido
[Back to top](#top)

<p>Crea un partido donde el jugador (que no puede estar en partida) que hace la petición es el jugador1 del partido creado</p>

	POST /matches

### Ejemplos

Authorization Header

```
Authorization=Bearer "{Id del usuario}"
```

### Respuesta exitosa

200 OK

```
HTTP/1.1 200 OK
{
  "match": {
    "_id": {
      "$oid": "62b9d0ea81d6f30bddc3d4d8"
    },
    "match_number": 640714,
    "player1_cells": [],
    "player1_id": {
      "$oid": "62b9450281d6f34dec1a36be"
    },
    "player2_cells": [],
    "player2_id": null,
    "status": "esperando",
    "winner_id": null
  }
}
```

### Respuesta con error

404 Not Found

```
HTTP/1.1 404 Not Found
{
  "message": {
    "El jugador solicitado no existe"
  }
}
```

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "Debe poseer un token válido para realizar esta acción"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No puede realizar esta acción, ya que se encuentra en partida actualmente"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No puede realizar esta acción, ya que se encuentra en partida actualmente"
  }
}
```

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

## <a name='unirse-partido'></a> Unirse a un partido
[Back to top](#top)

<p>El jugador (que no puede estar en partida) se une a un partido donde se esté esperando a otro jugador para comenzar</p>

	PUT /matches/:id/join | PATCH /matches/:id/join

### Ejemplos

Authorization Header

```
Authorization=Bearer "{Id del usuario}"
```

### Respuesta exitosa

200 OK

```
HTTP/1.1 200 OK
{
  "match": {
    "_id": {
      "$oid": "62b9d0ea81d6f30bddc3d4d8"
    },
    "match_number": 640714,
    "player1_cells": [],
    "player1_id": {
      "$oid": "62b9450281d6f34dec1a36be"
    },
    "player2_cells": [],
    "player2_id": {
      "$oid": "62afffee81d6f32ffd1c4e40"
    },
    "status": "juegap1",
    "winner_id": null
  }
}
```

### Respuesta con error

404 Not Found

```
HTTP/1.1 404 Not Found
{
  "message": {
    "El jugador solicitado no existe"
  }
}
```

```
HTTP/1.1 404 Not Found
{
  "message": {
    "El partido solicitado no existe"
  }
}
```

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "Debe poseer un token válido para realizar esta acción"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No puede realizar esta acción, ya que se encuentra en partida actualmente"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No puede realizar esta acción, ya que se encuentra en partida actualmente"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "El partido al cual se desea unir esta lleno"
  }
}
```

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

## <a name='refrescar-partido'></a> Refrescar partido
[Back to top](#top)

<p>Obtenemos el estado actual del partido si el otro jugador ya realizó un movimiento y ya es nuestro turno, además que recibimos una flag que nos dice si tenemos que seguir refrescando o no. Si es nuestro turno y aún no hacemos ninguna jugada, como no hay ningun cambio en el partido, devolvemos nulo.
También consideramos el caso de cuando termina la partida, ahí devolvemos el partido terminado y un flag diciendo que no refresque más</p>

	GET /matches/:id/refresh

### Ejemplos

Authorization Header

```
Authorization=Bearer "{Id del usuario}"
```

### Respuesta exitosa

200 OK

Por ej: Si somos el jugador 1, y todavía no nos toca porque el otro no hizo ninguna jugada, devolvemos nulo y un flag que diga que sigamos refrescando

```
HTTP/1.1 200 OK
{
  "match": null,
  "refresh": true
}
```
Por ej: Si somos el jugador 1, y ya es nuestro turno y queremos ver que jugada hizo el otro jugador, devolvemos el partido actualizado mas un flag que diga que tenemos que dejar de refrescar

```
HTTP/1.1 200 OK
{
  "match": {
    "_id": {
      "$oid": "62b9d0ea81d6f30bddc3d4d8"
    },
    "match_number": 640714,
    "player1_cells": ["0", ...],
    "player1_id": {
      "$oid": "62b9450281d6f34dec1a36be"
    },
    "player2_cells": ["1", ...],
    "player2_id": {
      "$oid": "62afffee81d6f32ffd1c4e40"
    },
    "status": "juegap1",
    "winner_id": null
  },
  "refresh": false
}
```

```
HTTP/1.1 200 OK
{
  "match": {
    "_id": {
      "$oid": "62b9d0ea81d6f30bddc3d4d8"
    },
    "match_number": 640714,
    "player1_cells": ["0", ...],
    "player1_id": {
      "$oid": "62b9450281d6f34dec1a36be"
    },
    "player2_cells": ["1", ...],
    "player2_id": {
      "$oid": "62afffee81d6f32ffd1c4e40"
    },
    "status": "finalizado",
    "winner_id": {
      "$oid": "62b9450281d6f34dec1a36be"
    }
  },
  "refresh": false
}
```

### Respuesta con error

404 Not Found

```
HTTP/1.1 404 Not Found
{
  "message": {
    "El jugador solicitado no existe"
  }
}
```

```
HTTP/1.1 404 Not Found
{
  "message": {
    "El partido solicitado no existe"
  }
}
```

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "Debe poseer un token válido para realizar esta acción"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No puede realizar esta acción, ya que no le corresponde esta partida"
  }
}
```

## <a name='hacer-jugada'></a> Hacer jugada
[Back to top](#top)

<p>Si es nuestro turno, podemos hacer una jugada, enviando la celda que queremos marcar</p>

	PUT /matches/:id/make_move | PATCH /matches/:id/make_move

### Ejemplos

Body

```
{
  "celdamarcada": "8"
}
```

Authorization Header

```
Authorization=Bearer "{Id del usuario}"
```

### Respuesta exitosa

200 OK

```
HTTP/1.1 200 OK
{
  "match": {
    "_id": {
      "$oid": "62b9d0ea81d6f30bddc3d4d8"
    },
    "match_number": 640714,
    "player1_cells": [
      "8"
    ],
    "player1_id": {
      "$oid": "62b9450281d6f34dec1a36be"
    },
    "player2_cells": [],
    "player2_id": {
      "$oid": "62afffee81d6f32ffd1c4e40"
    },
    "status": "juegap2",
    "winner_id": null
  }
}
```

### Respuesta con error

404 Not Found

```
HTTP/1.1 404 Not Found
{
  "message": {
    "El jugador solicitado no existe"
  }
}
```

```
HTTP/1.1 404 Not Found
{
  "message": {
    "El partido solicitado no existe"
  }
}
```

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "Debe poseer un token válido para realizar esta acción"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No es posible realizar una jugada"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No puede realizar esta acción, ya que no le corresponde esta partida"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No puede realizar una jugada porque no es su turno"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "Formato de celda inválido, debe ser solo un caracter que sea un numero entre el 0 y el 8"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "No puede marcar una celda que ya fue marcada"
  }
}
```

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

## <a name='abandonar-partido'></a> Abandonar partido
[Back to top](#top)

<p>Si queremos, podemos abandonar la partida en curso, resultando perdedores de esta si hubiere otro jugador unido y dando el partido por terminado. Si el jugador 1 abandona cuando está esperando un jugador, no se le considera perdedor pero la partida queda terminada definitivamente</p>

	PUT /matches/:id/abandon_match | PATCH /matches/:id/abandon_match

### Ejemplos

Authorization Header

```
Authorization=Bearer "{Id del usuario}"
```

### Respuesta exitosa

204 No Content

```
HTTP/1.1 204 No Content
```

### Respuesta con error

404 Not Found

```
HTTP/1.1 404 Not Found
{
  "message": {
    "El jugador solicitado no existe"
  }
}
```

```
HTTP/1.1 404 Not Found
{
  "message": {
    "El partido solicitado no existe"
  }
}
```

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "Debe poseer un token válido para realizar esta acción"
  }
}
```

```
HTTP/1.1 400 Bad Request
{
  "message": {
    "La partida ya terminó"
  }
}
```

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
