const jwt = require('jsonwebtoken');

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

        if (!decoded._id || !decoded.role) {
            return res.status(400).json({ message: 'El token no contiene la información necesaria del usuario.' });
        }

        req.user = {
            _id: decoded._id,  
            role: decoded.role,
        };

        console.log('Usuario decodificado:', req.user);
        next();
    });
};

exports.verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'administrador') {
        return res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
    }
    next();  
};


