// Middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Error en el servidor'; 

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), 
    });
};

module.exports = errorHandler;
