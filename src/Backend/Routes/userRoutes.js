// Routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const authMiddleware = require('../Middleware/authMiddleware');
const validationMiddleware = require('../Middleware/validationMiddleware');

// Rutas para la gestión de usuarios
router.post('/register', validationMiddleware.validateRegisterUser, userController.registerUser);
router.post('/login', validationMiddleware.validateLoginUser, userController.loginUser);
router.get('/', authMiddleware.verifyAdmin, userController.getAllUsers);
router.put('/:id', authMiddleware.verifyAdmin, userController.updateUser);
router.delete('/:id', authMiddleware.verifyAdmin, userController.deleteUser);

module.exports = router;

