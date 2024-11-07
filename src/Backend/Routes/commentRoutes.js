const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/commentController');
const authMiddleware = require('../Middleware/authMiddleware');

// Crear comentario para una bitácora
router.post('/:logId/comments', authMiddleware, commentController.createComment);

// Obtener todos los comentarios de una bitácora
router.get('/:logId/comments', commentController.getComments);

// Actualizar un comentario
router.put('/comments/:commentId', authMiddleware, commentController.updateComment);

// Eliminar un comentario
router.delete('/comments/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
