// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../Controllers/logController');
const authMiddleware = require('../Middleware/authMiddleware');
const rolesMiddleware = require('../Middleware/rolesMiddleware');
const { checkLogExists } = require('../Middleware/checkLogExists');  // Importamos el middleware

router.post('/', authMiddleware.verifyToken, rolesMiddleware(['administrador', 'investigador']),logController.createLog);

router.get('/', authMiddleware.verifyToken, logController.getLogs);

router.get('/:id', authMiddleware.verifyToken, logController.getLogById);

//router.get('/search', logController.searchLogs);

router.put('/:id', authMiddleware.verifyToken, rolesMiddleware(['administrador', 'investigador']),checkLogExists, logController.updateLog);

router.delete('/:id', authMiddleware.verifyToken,  rolesMiddleware(['administrador', 'investigador']),checkLogExists, logController.deleteLog);

module.exports = router;