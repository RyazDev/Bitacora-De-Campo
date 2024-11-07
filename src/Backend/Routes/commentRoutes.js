const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/commentController');
const authMiddleware = require('../Middleware/authMiddleware');

router.post('/:logId/comments', authMiddleware, commentController.createComment);

router.get('/:logId/comments', commentController.getComments);

router.put('/comments/:commentId', authMiddleware, commentController.updateComment);

router.delete('/comments/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
