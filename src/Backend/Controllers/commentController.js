const Comment = require('../Models/Comment');
const Log = require('../Models/Log');

const createComment = async (req, res) => {
    const { logId } = req.params;  // Log ID en la URL
    const { content } = req.body;

    try {
        const log = await Log.findById(logId);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        const comment = new Comment({
            logId,
            content,
            userId: req.user.id,  // Usuario autenticado
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario' });
    }
};

const getComments = async (req, res) => {
    const { logId } = req.params;  // Log ID en la URL

    try {
        const comments = await Comment.find({ logId }).populate('userId', 'name'); // Poblamos el usuario que hizo el comentario
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
};

const updateComment = async (req, res) => {
    const { commentId } = req.params;  // Comment ID en la URL
    const { content } = req.body;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        if (comment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permiso para editar este comentario' });
        }

        comment.content = content || comment.content;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el comentario' });
    }
};

const deleteComment = async (req, res) => {
    const { commentId } = req.params;  // Comment ID en la URL

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        if (comment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario' });
        }

        await comment.remove();
        res.status(200).json({ message: 'Comentario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el comentario' });
    }
};

module.exports = { createComment, getComments, updateComment, deleteComment };
