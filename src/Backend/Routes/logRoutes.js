// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../Controllers/logController');
const authMiddleware = require('../Middleware/authMiddleware');
const rolesMiddleware = require('../Middleware/rolesMiddleware');

router.post('/', authMiddleware.verifyToken, rolesMiddleware(['administrador', 'investigador']), logController.createLog);

router.get('/', logController.getLogs);

router.get('/search', logController.searchLogs);  // Ruta de búsqueda

router.put('/:id', authMiddleware.verifyToken, rolesMiddleware(['administrador', 'investigador']), logController.updateLog);

router.delete('/:id', authMiddleware.verifyToken, rolesMiddleware(['administrador', 'investigador']), logController.deleteLog);

module.exports = router;

