// testPool.js
const pool = require('./config/mysqlConfig'); // Ajusta la ruta según la estructura de tu proyecto

async function testPool() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('Test result:', rows[0].result); // Debería imprimir 2
    } catch (error) {
        console.error('Error de prueba:', error);
    }
}

testPool();
