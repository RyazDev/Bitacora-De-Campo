const Log = require('../Models/LogModel');
const { validationResult } = require('express-validator');

// Crear bitácora
const createLog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, samplingDate, location, weatherConditions, habitatDescription, speciesCollected, additionalNotes, photos } = req.body;

    // Validación de las coordenadas
    if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        return res.status(400).json({ message: 'Coordenadas inválidas. Deben ser un array de dos números (longitud, latitud).' });
    }

    // Validación de fecha de muestreo
    if (isNaN(new Date(samplingDate))) {
        return res.status(400).json({ message: 'Fecha de muestreo inválida.' });
    }

    // Creación de la bitácora
    const log = new Log({
        title,
        samplingDate,
        location,
        weatherConditions,
        habitatDescription,
        speciesCollected,
        additionalNotes,
        photos,
        userId: req.userId,
        isPublic: req.body.isPublic || false
    });

    try {
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la bitácora', error: error.message });
    }
};

// Obtener bitácoras públicas
const getLogs = async (req, res) => {
    try {
        const logs = await Log.find({ isPublic: true });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las bitácoras', error: error.message });
    }
};

// Obtener bitácora por ID
const getLogById = async (req, res) => {
    const { id } = req.params;

    try {
        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la bitácora', error: error.message });
    }
};

// Actualizar bitácora (solo el creador o administradores)
const updateLog = async (req, res) => {
    const { id } = req.params;

    try {
        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        // Permiso para actualizar
        if (log.userId.toString() !== req.userId && req.role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permiso para editar esta bitácora' });
        }

        // Actualización de campos
        const updates = {
            title: req.body.title || log.title,
            samplingDate: req.body.samplingDate || log.samplingDate,
            location: req.body.location || log.location,
            weatherConditions: req.body.weatherConditions || log.weatherConditions,
            habitatDescription: req.body.habitatDescription || log.habitatDescription,
            speciesCollected: req.body.speciesCollected || log.speciesCollected,
            additionalNotes: req.body.additionalNotes || log.additionalNotes,
            photos: req.body.photos || log.photos,
            isPublic: req.body.isPublic !== undefined ? req.body.isPublic : log.isPublic
        };

        Object.assign(log, updates);
        await log.save();
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la bitácora', error: error.message });
    }
};

// Eliminar bitácora (solo el creador o administradores)
const deleteLog = async (req, res) => {
    const { id } = req.params;

    try {
        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        // Permiso para eliminar
        if (log.userId.toString() !== req.userId && req.role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta bitácora' });
        }

        await log.remove();
        res.status(200).json({ message: 'Bitácora eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la bitácora', error: error.message });
    }
};

module.exports = {
    createLog,
    getLogs,
    getLogById,
    updateLog,
    deleteLog
};


