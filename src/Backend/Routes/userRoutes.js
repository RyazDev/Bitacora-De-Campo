// Routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const authMiddleware = require('../Middleware/authMiddleware');
const validationMiddleware = require('../Middleware/validationMiddleware');

router.post('/register', validationMiddleware.validateRegisterUser, userController.registerUser);
router.post('/login', validationMiddleware.validateLoginUser, userController.loginUser);
router.get('/auth/user', authMiddleware.verifyToken, userController.getAuthenticatedUser);

router.get('/', authMiddleware.verifyAdmin, userController.getAllUsers);
router.put('/:identifier', authMiddleware.verifyAdmin, userController.updateUser);
router.delete('/:identifier', authMiddleware.verifyAdmin, userController.deleteUser);

module.exports = router;


