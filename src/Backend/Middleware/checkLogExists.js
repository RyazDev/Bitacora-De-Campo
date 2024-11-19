// Middleware para verificar si la bitácora existe

const Log = require('../models/LogModel'); 

const checkLogExists = async (req, res, next) => {
    const { id } = req.params; 

    try {
        const log = await Log.findById(id);
        
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        req.log = log;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al verificar la bitácora', error: error.message });
    }
};

module.exports = { checkLogExists };
