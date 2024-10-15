const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta para registrar un cliente
router.post('/registerCliente', authController.registrarCliente);

// Ruta para hacer login de un cliente
router.post('/loginCliente', authController.loginCliente);


module.exports = router;
