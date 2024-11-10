const jwt = require('jsonwebtoken');

// Middleware para verificar si el token es válido
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado. No autorizado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido.' });
        }

        // Verificar que decoded contenga _id y role
        if (!decoded._id || !decoded.role) {
            return res.status(400).json({ message: 'El token no contiene la información necesaria del usuario.' });
        }

        // Asignar el _id y role al objeto req.user
        req.user = {
            _id: decoded._id,  // Asegúrate de asignar el _id correctamente
            role: decoded.role,
        };

        console.log('Usuario decodificado:', req.user);
        next();
    });
};

// Middleware para verificar si el usuario es un administrador
exports.verifyAdmin = (req, res, next) => {
    // Verificar si req.user está presente
    if (!req.user || req.user.role !== 'administrador') {
        return res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
    }
    next();  // Continuamos si el rol es correcto
};


