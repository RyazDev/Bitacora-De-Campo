const Comment = require('../Models/Comment');
const Log = require('../Models/Log');

// Crear un comentario dentro de una bitácora
const createComment = async (req, res) => {
    const { logId } = req.params;  // Log ID en la URL
    const { content } = req.body;

    try {
        // Verifica si la bitácora existe
        const log = await Log.findById(logId);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        // Crea el nuevo comentario
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

// Obtener todos los comentarios de una bitácora
const getComments = async (req, res) => {
    const { logId } = req.params;  // Log ID en la URL

    try {
        // Obtiene todos los comentarios asociados a la bitácora
        const comments = await Comment.find({ logId }).populate('userId', 'name'); // Poblamos el usuario que hizo el comentario
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
};

// Actualizar un comentario
const updateComment = async (req, res) => {
    const { commentId } = req.params;  // Comment ID en la URL
    const { content } = req.body;

    try {
        // Busca el comentario
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        // Verifica si el usuario es el propietario del comentario o un administrador
        if (comment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permiso para editar este comentario' });
        }

        // Actualiza el contenido del comentario
        comment.content = content || comment.content;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el comentario' });
    }
};

// Eliminar un comentario
const deleteComment = async (req, res) => {
    const { commentId } = req.params;  // Comment ID en la URL

    try {
        // Busca el comentario
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        // Verifica si el usuario es el propietario del comentario o un administrador
        if (comment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario' });
        }

        // Elimina el comentario
        await comment.remove();
        res.status(200).json({ message: 'Comentario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el comentario' });
    }
};

module.exports = { createComment, getComments, updateComment, deleteComment };
