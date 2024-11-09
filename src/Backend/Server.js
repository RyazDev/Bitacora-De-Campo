const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const logRoutes = require('./Routes/logRoutes'); // Importar las rutas de log
const errorHandler = require('./Middleware/errorMiddleware');

dotenv.config(); // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
mongoose.connect(process.env.DB_URI)  // Ya no es necesario agregar opciones de conexión aquí
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error de conexión a la base de datos:', err));

// Ruta raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la página principal de la API!');
});

// Rutas
app.use('/api/users', userRoutes);  // Rutas de usuarios
app.use('/api/logs', logRoutes);    // Rutas para las bitácoras (gestión de logs)

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Manejo de 404
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
