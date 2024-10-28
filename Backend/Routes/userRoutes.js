// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Ejemplo de ruta
router.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Bitácora de Aves!');
});

module.exports = router;