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




Proyecto Tesis
├── config
│   └── mysqlConfig.js
├── controllers
│   ├── admin.controller.js
│   ├── auth.controller.js
│   ├── compras.controller.js
│   └── restaurant.controller.js
├── frontend
│   ├── node_modules
│   │   └── [módulos]
│   ├── public
│   ├── src
│   │   ├── assets
│   │   │   └── [archivos assets]
│   │   ├── components
│   │   │   ├── AppDownload
│   │   │   │   ├── AppDownload.js
│   │   │   │   ├── AppDownload.css
│   │   │   ├── Footer
│   │   │   │   ├── Footer.js
│   │   │   │   ├── Footer.css
│   │   │   ├── Ganancias
│   │   │   │   ├── Ganancias.js
│   │   │   ├── LoginPopup
│   │   │   │   ├── LoginPopup.js
│   │   │   │   ├── LoginPopup.css
│   │   │   ├── Navbar
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── Navbar.css
│   │   │   ├── PlatosCRUD
│   │   │   │   ├── PlatosCRUD.js
│   │   │   │   ├── PlatosCRUD.css
│   │   ├── pages
│   │   │   ├── AdminDashboard
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   ├── AdminDashboard.css
│   │   │   ├── AdminPage
│   │   │   │   ├── AdminPage.js
│   │   │   │   ├── AdminPage.css
│   │   │   ├── Cart
│   │   │   │   ├── Cart.js
│   │   │   │   ├── Cart.css
│   │   │   ├── ClientPage
│   │   │   │   ├── Actividad
│   │   │   │   │   ├── Actividad.js
│   │   │   │   │   ├── Actividad.css
│   │   │   │   ├── MisCupones
│   │   │   │   │   ├── MisCupones.js
│   │   │   │   │   ├── MisCupones.css
│   │   │   │   ├── MisDatos
│   │   │   │   │   ├── MisDatos.js
│   │   │   │   │   ├── MisDatos.css
│   │   │   │   ├── ClientPage.js
│   │   │   │   ├── ClientPage.css
│   │   │   ├── Contact
│   │   │   │   ├── Contact.js
│   │   │   │   ├── Contact.css
│   │   │   ├── Home
│   │   │   │   ├── Home.js
│   │   │   │   ├── Home.css
│   │   │   ├── Menu
│   │   │   │   ├── Menu.js
│   │   │   │   ├── Menu.css
│   │   │   ├── PlaceOrder
│   │   │   │   ├── PlaceOrder.js
│   │   │   │   ├── PlaceOrder.css
│   │   │   ├── RegistrarAdmin
│   │   │   │   ├── RegistrarAdmin.js
│   │   │   │   ├── RegistrarAdmin.css
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test
│   │   ├── index.css
│   │   ├── logo.svg
│   │   ├── ReporteWebVitals.js
│   │   ├── setupTest.js
│   │   ├── .gitignore
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── README.md
├── middleware
│   └── authMiddleware.js
├── node_modules
│   └── [módulos]
├── public
│   └── [archivos públicos]
├── routes
│   ├── admin.routes.js
│   ├── auth.routes.js
│   ├── compras.routes.js
│   └── restaurant.routes.js
├── upload
│   └── [archivos de subida]
├── .env
├── .gitignore
├── index.js
├── multer.js
├── package-lock.json
├── package.json
├── README.md
└── testConnection.js
