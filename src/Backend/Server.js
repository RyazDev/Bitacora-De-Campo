const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const errorHandler = require('./Middleware/errorMiddleware');

dotenv.config(); // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error de conexión a la base de datos:', err));

// Rutas
app.use('/api/users', userRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
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

