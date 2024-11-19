const { validationResult } = require('express-validator');  
const mongoose = require('mongoose');  
const Log = require('../models/LogModel');  

const createLog = async (req, res) => {
    console.log('Usuario autenticado:', req.user); 
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, samplingDate, location, weatherConditions, habitatDescription, speciesCollected, additionalNotes, photos, isPublic } = req.body;
    const author = req.user._id; 

    if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        return res.status(400).json({ message: 'Coordenadas inválidas. Deben ser un array de dos números (longitud, latitud).' });
    }

    if (isNaN(new Date(samplingDate))) {
        return res.status(400).json({ message: 'Fecha de muestreo inválida. Use el formato YYYY-MM-DD.' });
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
        author,  
        isPublic: isPublic !== undefined ? isPublic : false,  
    });

    try {
        await log.save();
        res.status(201).json(log); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la bitácora', error: error.message });
    }
};

const getLogById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        if (log.isPublic === false && log.author.toString() !== req.user._id && req.user.role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permiso para ver esta bitácora' });
        }

        res.status(200).json(log);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la bitácora', error: error.message });
    }
};

const getLogs = async (req, res) => {
    try {
        const logs = await Log.find();  

        if (logs.length === 0) {
            return res.status(404).json({ message: 'No se encontraron bitácoras.' });
        }

        res.status(200).json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las bitácoras', error: error.message });
    }
};

/*const searchLogs = async (req, res) => {
    const { title, samplingDate, latitude, longitude, species } = req.query;
    console.log('Parámetros de búsqueda:', req.query);  
    try {
        const filters = {};
        if (title) {
            if (typeof title !== 'string' || title.trim().length === 0) {
                return res.status(400).json({ message: 'El título debe ser una cadena no vacía.' });
            }
            filters.title = { $regex: title, $options: 'i' }; 
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
                        [lon, lat], 
                        5 / 3963.2 
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
};*/



const updateLog = async (req, res) => {
    const { id } = req.params;

    try {
        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        if (log.author.toString() !== req.user._id && req.user.role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permiso para editar esta bitácora' });
        }

        const { title, samplingDate, location, weatherConditions, habitatDescription, speciesCollected, additionalNotes, photos, isPublic } = req.body;

        if (title && typeof title !== 'string') {
            return res.status(400).json({ message: 'El título debe ser una cadena de texto válida.' });
        }

        if (samplingDate && isNaN(new Date(samplingDate))) {
            return res.status(400).json({ message: 'La fecha de la muestra debe ser una fecha válida.' });
        }

        if (location) {
            if (!location.type || location.type !== 'Point') {
                return res.status(400).json({ message: 'El tipo de ubicación debe ser "Point".' });
            }
            if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
                return res.status(400).json({ message: 'Las coordenadas deben ser un arreglo con dos números.' });
            }
            const [longitude, latitude] = location.coordinates;
            if (typeof longitude !== 'number' || typeof latitude !== 'number') {
                return res.status(400).json({ message: 'Las coordenadas deben ser números válidos.' });
            }
        }

        if (speciesCollected) {
            if (!Array.isArray(speciesCollected)) {
                return res.status(400).json({ message: 'Las especies recolectadas deben ser un arreglo.' });
            }
            speciesCollected.forEach(species => {
                if (typeof species.scientificName !== 'string' || typeof species.commonName !== 'string') {
                    return res.status(400).json({ message: 'Cada especie debe tener un nombre científico y un nombre común válidos.' });
                }
            });
        }

        if (photos && !Array.isArray(photos)) {
            return res.status(400).json({ message: 'Las fotos deben ser un arreglo de cadenas de texto.' });
        }

        if (isPublic !== undefined && typeof isPublic !== 'boolean') {
            return res.status(400).json({ message: 'El campo "isPublic" debe ser un valor booleano.' });
        }

        const updates = {
            title: title || log.title,
            samplingDate: samplingDate || log.samplingDate,
            location: location || log.location,
            weatherConditions: weatherConditions || log.weatherConditions,
            habitatDescription: habitatDescription || log.habitatDescription,
            speciesCollected: speciesCollected || log.speciesCollected,
            additionalNotes: additionalNotes || log.additionalNotes,
            photos: photos || log.photos,
            isPublic: isPublic !== undefined ? isPublic : log.isPublic, // Controlando actualización del flag 'isPublic'
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
        await Log.deleteMany({ author: { $exists: false } });

        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        if (log.author.toString() !== req.user._id && req.user.role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta bitácora' });
        }

        await log.deleteOne();

        res.status(200).json({ message: 'Bitácora eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la bitácora', error: error.message });
    }
};

module.exports = {
    createLog,
    getLogs,
    updateLog, 
    deleteLog,
    getLogById,
    //searchLogs
};


