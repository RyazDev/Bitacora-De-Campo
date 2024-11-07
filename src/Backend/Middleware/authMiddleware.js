// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Verificar que el token es válido
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener token desde el encabezado
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido.' });
        }
        req.userId = decoded.id;   // El ID del usuario decodificado
        req.role = decoded.role;   // El rol del usuario decodificado
        next(); // Pasamos al siguiente middleware o controlador
    });
};

exports.verifyAdmin = (req, res, next) => {
    exports.verifyToken(req, res, () => {
        if (req.role !== 'administrador') {
            return res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
        }
        next();
    });
};

