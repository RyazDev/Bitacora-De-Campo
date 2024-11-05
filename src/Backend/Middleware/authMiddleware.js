// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido.' });
        }
        req.userId = decoded.id;
        req.role = decoded.role; // Asegúrate de que el rol esté incluido en el token
        next();
    });
};

exports.verifyAdmin = (req, res, next) => {
    this.verifyToken(req, res, () => {
        if (req.role !== 'administrador') {
            return res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
        }
        next();
    });
};

