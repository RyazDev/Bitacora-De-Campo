// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../Models/User'); // Asegúrate de que la ruta sea correcta

// Crear nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  const nuevoUsuario = new User({ nombre, email, contraseña });
  try {
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
