// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado. No autorizado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido.' });
        }

        req.user = user; // Aquí estamos asignando el 'user' decodificado al objeto req.user
        next(); // Pasa al siguiente middleware o controlador
    });
};


// Middleware para verificar si el usuario es un administrador
exports.verifyAdmin = (req, res, next) => {
    // Asegúrate de que el token esté verificado primero
    exports.verifyToken(req, res, () => {
        // Verificar el rol del usuario
        if (req.user.role !== 'administrador') {  // Aquí se accede a req.user.role
            return res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
        }
        next();
    });
};


