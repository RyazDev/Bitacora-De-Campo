// routes/logRoutes.js

const express = require('express');
const router = express.Router();
const Log = require('../models/Log'); // Asegúrate de que tienes el modelo Log

// Obtener todas las bitácoras
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find(); // Encuentra todas las bitácoras
        res.json(logs); // Devuelve las bitácoras como JSON
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nueva bitácora
router.post('/', async (req, res) => {
    const log = new Log({
        // Aquí define los campos que tendrá tu modelo Log
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        // Agrega otros campos según tu modelo
    });

    try {
        const newLog = await log.save(); // Guarda la nueva bitácora
        res.status(201).json(newLog); // Devuelve la bitácora creada
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Exportar las rutas
module.exports = router;
