const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/compras.controller');

// Ruta para registrar una compra
router.post('/registrar', comprasController.registrarCompra);

module.exports = router;
