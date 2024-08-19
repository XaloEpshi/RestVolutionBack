# Proyecto Tesis

## Descripción

Este proyecto es una aplicación web para la gestión de un restaurante. Permite a los clientes visualizar el menú, realizar pedidos, hacer reservas, y ver promociones. Los administradores pueden gestionar platos, revisar ganancias y crear nuevos administradores.

## Tecnologías Utilizadas

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express, MySQL
- **Base de Datos:** MySQL
- **Middleware:** JWT para autenticación

## Instalación

### Backend

1. Navega a la carpeta del backend:
    ```bash
    cd proyectotesis
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Configura el archivo `.env` con las variables necesarias (puerto, clave secreta, etc.)

4. Inicia el servidor:
    ```bash
    npm start
    ```

### Frontend

1. Navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Inicia el cliente:
    ```bash
    npm start
    ```

## Uso

### Rutas del Backend

- **POST `/admin/create`**: Crea un nuevo administrador.
- **POST `/auth/login`**: Inicia sesión y recibe un token JWT.
- **GET `/menu`**: Obtiene el menú.
- **POST `/pedido`**: Realiza un nuevo pedido.

### Rutas del Frontend

- **`/`**: Página principal.
- **`/menu`**: Visualiza el menú del restaurante.
- **`/cart`**: Muestra los artículos en el carrito.
- **`/contactanos`**: Formulario de contacto.
- **`/admin/create`**: Formulario para crear un nuevo administrador (requiere autenticación).

