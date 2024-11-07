const Log = require('../Models/LogModel');
const { validationResult } = require('express-validator');

const createLog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, samplingDate, location, weatherConditions, habitatDescription, speciesCollected, additionalNotes, photos } = req.body;

    if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        return res.status(400).json({ message: 'Coordenadas inválidas. Deben ser un array de dos números (longitud, latitud).' });
    }

    if (isNaN(new Date(samplingDate))) {
        return res.status(400).json({ message: 'Fecha de muestreo inválida.' });
    }

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

const getLogs = async (req, res) => {
    try {
        const logs = await Log.find({ isPublic: true });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las bitácoras', error: error.message });
    }
};

// Obtener bitácora por ID
/*const getLogById = async (req, res) => {
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
};*/

const searchLogs = async (req, res) => {
    const { title, samplingDate, latitude, longitude, species } = req.query;

    try {
        const filters = {};

        if (title) {
            if (typeof title !== 'string' || title.trim().length === 0) {
                return res.status(400).json({ message: 'El título debe ser una cadena no vacía.' });
            }
            filters.title = { $regex: title, $options: 'i' }; // Búsqueda insensible a mayúsculas y minúsculas
        }

        if (samplingDate) {
            const date = new Date(samplingDate);
            if (isNaN(date)) {
                return res.status(400).json({ message: 'Fecha inválida. Use el formato YYYY-MM-DD.' });
            }
            filters.samplingDate = date;
        }

        if (latitude && longitude) {
            const lat = parseFloat(latitude);
            const lon = parseFloat(longitude);
            if (isNaN(lat) || isNaN(lon)) {
                return res.status(400).json({ message: 'Las coordenadas de latitud y longitud deben ser números válidos.' });
            }
            filters.location = {
                $geoWithin: {
                    $centerSphere: [
                        [lon, lat], // Recuerda que el orden es [longitud, latitud]
                        5 / 3963.2 // Radio de 5 km
                    ]
                }
            };
        }

        if (species) {
            if (typeof species !== 'string' || species.trim().length === 0) {
                return res.status(400).json({ message: 'La especie debe ser una cadena no vacía.' });
            }
            filters.speciesCollected = { $elemMatch: { commonName: { $regex: species, $options: 'i' } } };
        }

        if (Object.keys(filters).length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar al menos un parámetro de búsqueda.' });
        }

        const logs = await Log.find(filters);

        if (logs.length === 0) {
            return res.status(404).json({ message: 'No se encontraron bitácoras que coincidan con los parámetros de búsqueda.' });
        }
        res.status(200).json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las bitácoras', error: error.message });
    }
};

const updateLog = async (req, res) => {
    const { id } = req.params;

    try {
        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        if (log.userId.toString() !== req.userId && req.role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permiso para editar esta bitácora' });
        }

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

const deleteLog = async (req, res) => {
    const { id } = req.params;

    try {
        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

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
    searchLogs,
    updateLog,
    deleteLog
};


