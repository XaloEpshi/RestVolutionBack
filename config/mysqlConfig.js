// Importa el módulo mysql2/promise para usar la funcionalidad de promesas en MySQL
const mysql = require('mysql2/promise');
// Importa dotenv para cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Crea una conexión de grupo (pool) para manejar las conexiones a la base de datos
const pool = mysql.createPool({
    // La dirección del servidor de base de datos, leída desde las variables de entorno
    host: process.env.DB_HOST,
    // El puerto del servidor de base de datos, también leído desde las variables de entorno
    port: process.env.DB_PORT, // Asegúrate de que esta línea esté presente
    // El usuario para conectar con la base de datos, leído desde las variables de entorno
    user: process.env.DB_USER,
    // La contraseña para conectar con la base de datos, leída desde las variables de entorno
    password: process.env.DB_PASSWORD,
    // El nombre de la base de datos con la que se va a conectar, leído desde las variables de entorno
    database: process.env.DB_NAME,
    // Configura la espera para nuevas conexiones cuando todas las conexiones del pool estén en uso
    waitForConnections: true,
    // Establece el límite máximo de conexiones que se pueden mantener en el pool
    connectionLimit: 10,
    // Límite de la cola de conexiones pendientes. 0 significa que no hay límite
    queueLimit: 0
});

// Exporta el pool para que pueda ser utilizado en otros módulos
module.exports = pool;
