// Middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Mostrar el stack trace del error en la consola
    const statusCode = err.statusCode || 500; // Establecer el código de estado
    const message = err.message || 'Error en el servidor'; // Mensaje de error

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Mostrar stack solo en desarrollo
    });
};

module.exports = errorHandler;
