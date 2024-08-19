const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Registro de administradores
router.post('/register', adminController.registrarAdministrador);

// Login de administradores
router.post('/login', adminController.loginAdministrador);

// Ejemplo de una ruta protegida que requiere autenticación y rol de administrador
router.get('/protected-route', verifyToken, verifyAdmin, (req, res) => {
  res.status(200).json({ message: 'Access granted to protected route' });
});

module.exports = router;
