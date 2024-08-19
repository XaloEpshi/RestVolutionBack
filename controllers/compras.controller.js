const mysqlPool = require('../mysqlConfig'); // Importa la configuración de MySQL


// Controlador para registrar una compra realizada por un cliente
exports.registrarCompra = (req, res) => {
    const { idCliente, idPlato, cantidad } = req.body;

    // Validar que los datos necesarios estén presentes y sean válidos
    if (!idCliente || !idPlato || !cantidad) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validar que cantidad sea un número válido
    if (isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).json({ error: 'La cantidad debe ser un número positivo' });
    }

    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaCompra = new Date().toISOString().slice(0, 10);

    // Consulta SQL para insertar la compra en la tabla 'compras'
    const query = 'INSERT INTO compras (idCliente, idPlato, cantidad, fechaCompra) VALUES (?, ?, ?, ?)';
    mysqlPool.query(query, [idCliente, idPlato, cantidad, fechaCompra], (error, results) => {
        if (error) {
            console.error('Error al registrar la compra:', error);
            return res.status(500).json({ error: 'Error al registrar la compra' });
        }

        // Si la inserción fue exitosa, enviar respuesta de éxito
        res.status(200).json({ message: 'Compra registrada correctamente' });
    });
};
