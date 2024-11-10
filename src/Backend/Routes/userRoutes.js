// Routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const authMiddleware = require('../Middleware/authMiddleware');
const validationMiddleware = require('../Middleware/validationMiddleware');

router.post('/register', validationMiddleware.validateRegisterUser, userController.registerUser);
router.post('/login', validationMiddleware.validateLoginUser, userController.loginUser);
router.get('/user', authMiddleware.verifyToken, userController.getAuthenticatedUser);

router.get('/', authMiddleware.verifyToken, authMiddleware.verifyAdmin, userController.getAllUsers);
router.put('/:identifier', authMiddleware.verifyToken, authMiddleware.verifyAdmin, userController.updateUser);
router.delete('/:identifier', authMiddleware.verifyToken, authMiddleware.verifyAdmin, userController.deleteUser);

module.exports = router;


