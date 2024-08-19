const mysql = require('mysql2');

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',  // Puerto de MySQL
    user: 'root',  // Usuario de la base de datos
    password: 'root',  // Contraseña del usuario
    database: 'restvolucion',  // Nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,  // Límite máximo de conexiones en el pool
    queueLimit: 0  // Sin límite en la cantidad de conexiones en espera
});

// Prueba de conexión al pool de MySQL
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida correctamente.');

    // Liberar la conexión
    connection.release();
});

module.exports = pool;
