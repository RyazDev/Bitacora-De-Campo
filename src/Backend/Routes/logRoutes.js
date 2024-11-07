// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../Controllers/logController');
const authMiddleware = require('../Middleware/authMiddleware');
const rolesMiddleware = require('../Middleware/rolesMiddleware');

// Crear bitácora (solo administrador e investigador pueden crear)
router.post('/', authMiddleware.verifyToken, rolesMiddleware(['administrador', 'investigador']), logController.createLog);

// Listar bitácoras (solo listado sin restricción de rol)
router.get('/', logController.getLogs);

// Obtener bitácora por ID (sin restricción de rol)
router.get('/:id', logController.getLogById);

// Actualizar bitácora (solo administrador e investigador pueden actualizar)
router.put('/:id', authMiddleware.verifyToken, rolesMiddleware(['administrador', 'investigador']), logController.updateLog);

// Eliminar bitácora (solo administrador e investigador pueden eliminar)
router.delete('/:id', authMiddleware.verifyToken, rolesMiddleware(['administrador', 'investigador']), logController.deleteLog);

module.exports = router;

