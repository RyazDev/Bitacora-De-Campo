// Middleware para verificar si la bitácora existe
// Middleware checkLogExists.js
const Log = require('../models/LogModel'); // Asegúrate de que el modelo de Log esté importado

const checkLogExists = async (req, res, next) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la ruta

    try {
        // Intentamos encontrar la bitácora por ID
        const log = await Log.findById(id);
        
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        // Si la bitácora existe, la agregamos a la solicitud para que pueda usarse en el controlador
        req.log = log;

        // Continuamos con la siguiente acción
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al verificar la bitácora', error: error.message });
    }
};

module.exports = { checkLogExists };
