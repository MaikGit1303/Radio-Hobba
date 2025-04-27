# Habbus Backend

Este es el backend para el proyecto **Habbus**, que maneja el registro e inicio de sesión de usuarios utilizando una base de datos MySQL.

## Tecnologías usadas

- Node.js
- Express
- MySQL (mysql2)
- bcrypt (para el hash de contraseñas)
- dotenv (para manejo de variables de entorno)
- cors
- body-parser

## Configuración

1. Clona este repositorio y navega a la carpeta del proyecto.

2. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables, ajustando los valores a tu configuración de MySQL:

```
DB_HOST=tu_host_mysql
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=nombre_de_tu_base_de_datos
```

3. Instala las dependencias:

```
npm install
```

4. Ejecuta el servidor:

```
node server.js
```

El servidor escuchará en el puerto definido en la variable de entorno `PORT` o en el puerto 3000 por defecto.

## Endpoints

- `POST /register`  
  Registra un nuevo usuario.  
  Parámetros JSON:  
  ```json
  {
    "username": "usuario",
    "email": "correo@ejemplo.com",
    "password": "contraseña"
  }
  ```

- `POST /login`  
  Inicia sesión con un usuario existente.  
  Parámetros JSON:  
  ```json
  {
    "username": "usuario",
    "password": "contraseña"
  }
  ```

## Notas

- Las contraseñas se almacenan de forma segura usando hashing con bcrypt.
- La tabla `users` se crea automáticamente si no existe.
- El frontend debe enviar las solicitudes a estos endpoints para manejar el registro e inicio de sesión.

## Contacto

Para cualquier duda o mejora, abre un issue o contacta al desarrollador.

---
