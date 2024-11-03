// server.js

// Cargar las variables de entorno
require('dotenv').config();

// Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config'); // Importa la configuración
const cors = require('cors'); // Para habilitar CORS

// Importar las rutas
const userRoutes = require('./routes/userRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Para analizar el cuerpo de las solicitudes en formato JSON

// Conectar a la base de datos
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/usuarios', userRoutes); // Rutas de usuarios
app.use('/api/logs', logRoutes); // Rutas de bitácoras

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Bitácora de Aves!');
});

// Iniciar el servidor
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
