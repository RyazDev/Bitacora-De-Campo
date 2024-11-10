const { validationResult } = require('express-validator');  // Asegúrate de que esta dependencia esté importada
const Log = require('../models/LogModel');  // Importa tu modelo de Log

const createLog = async (req, res) => {
    console.log('Usuario autenticado:', req.user); // Esto debería mostrar el usuario decodificado
    
    // Verificar errores de validación de las entradas
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, samplingDate, location, weatherConditions, habitatDescription, speciesCollected, additionalNotes, photos, isPublic } = req.body;
    const author = req.user._id;  // El ID del usuario autenticado debe estar en req.user

    // Validación de las coordenadas y fecha
    if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        return res.status(400).json({ message: 'Coordenadas inválidas. Deben ser un array de dos números (longitud, latitud).' });
    }

    if (isNaN(new Date(samplingDate))) {
        return res.status(400).json({ message: 'Fecha de muestreo inválida. Use el formato YYYY-MM-DD.' });
    }

    // Crear la bitácora con los datos proporcionados
    const log = new Log({
        title,
        samplingDate,
        location,
        weatherConditions,
        habitatDescription,
        speciesCollected,
        additionalNotes,
        photos,
        author,  // Asignamos el autor como el ID del usuario autenticado
        isPublic: isPublic !== undefined ? isPublic : false,  // Si no se pasa isPublic, se asigna por defecto a 'false'
    });

    try {
        // Guardar la nueva bitácora en la base de datos
        await log.save();
        res.status(201).json(log);  // Retornamos la bitácora recién creada
    } catch (error) {
        // Manejo de errores de la base de datos
        console.error(error);
        res.status(500).json({ message: 'Error al crear la bitácora', error: error.message });
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

const getLogs = async (req, res) => {
    try {
        // Obtener todas las bitácoras desde la base de datos (sin ningún filtro)
        const logs = await Log.find();  // Esto traerá todas las bitácoras con todos sus campos

        // Si no se encuentran bitácoras
        if (logs.length === 0) {
            return res.status(404).json({ message: 'No se encontraron bitácoras.' });
        }

        // Enviar las bitácoras en la respuesta
        res.status(200).json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las bitácoras', error: error.message });
    }
};

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

        // Validar que el usuario es el autor o un administrador
        if (log.author.toString() !== req.user._id && req.user.role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permiso para editar esta bitácora' });
        }

        // Validaciones para los campos de la solicitud
        const { title, samplingDate, location, weatherConditions, habitatDescription, speciesCollected, additionalNotes, photos, isPublic } = req.body;

        // Validar título: debe ser una cadena no vacía
        if (title && typeof title !== 'string') {
            return res.status(400).json({ message: 'El título debe ser una cadena de texto válida.' });
        }

        // Validar fecha: debe ser un objeto Date válido
        if (samplingDate && isNaN(new Date(samplingDate))) {
            return res.status(400).json({ message: 'La fecha de la muestra debe ser una fecha válida.' });
        }

        // Validar ubicación geoespacial
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

        // Validar especies recolectadas
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

        // Validar fotos
        if (photos && !Array.isArray(photos)) {
            return res.status(400).json({ message: 'Las fotos deben ser un arreglo de cadenas de texto.' });
        }

        // Validar el campo isPublic: debe ser un booleano
        if (isPublic !== undefined && typeof isPublic !== 'boolean') {
            return res.status(400).json({ message: 'El campo "isPublic" debe ser un valor booleano.' });
        }

        // Aquí aseguramos que solo se actualicen los campos que vienen en el request.
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

        // Asignar las actualizaciones al log y guardarlo
        Object.assign(log, updates);

        // Guardar los cambios en la base de datos
        await log.save();
        
        // Responder con la bitácora actualizada
        res.status(200).json(log);
    } catch (error) {
        // Capturar errores y enviar respuesta adecuada
        res.status(500).json({ message: 'Error al actualizar la bitácora', error: error.message });
    }
};

const deleteLog = async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar documentos sin 'author' automáticamente
        await Log.deleteMany({ author: { $exists: false } });

        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }

        // Verificar permisos de eliminación
        if (log.author.toString() !== req.user._id && req.user.role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta bitácora' });
        }

        // Eliminar la bitácora de la base de datos
        await log.deleteOne();

        // Responder con un mensaje de éxito
        res.status(200).json({ message: 'Bitácora eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la bitácora', error: error.message });
    }
};

module.exports = {
    createLog,
    getLogs,
    searchLogs,
    updateLog, // Verifica que este esté exportado
    deleteLog,
};


