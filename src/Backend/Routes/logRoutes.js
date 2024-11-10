// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../Controllers/logController');
const authMiddleware = require('../Middleware/authMiddleware');
const rolesMiddleware = require('../Middleware/rolesMiddleware');
const { checkLogExists } = require('../Middleware/checkLogExists');  // Importamos el middleware

// Ruta para crear bitácora
router.post('/', authMiddleware.verifyToken, logController.createLog);

// Ruta para obtener todas las bitácoras públicas
router.get('/', authMiddleware.verifyToken, logController.getLogs);

// Ruta de búsqueda de bitácoras
router.get('/search', authMiddleware.verifyToken, logController.searchLogs);

// Ruta para actualizar una bitácora por su ID
router.put('/:id', authMiddleware.verifyToken, rolesMiddleware(['administrador', 'investigador']),checkLogExists, logController.updateLog);

// Ruta para eliminar una bitácora por su ID
router.delete('/:id', authMiddleware.verifyToken,  rolesMiddleware(['administrador', 'investigador']),checkLogExists, logController.deleteLog);

module.exports = router;