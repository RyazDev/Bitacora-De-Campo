// middleware/rolesMiddleware.js
const rolesMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        // Asegúrate de que el rol está disponible en req.user
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado. Rol no permitido.' });
        }
        next(); // Continuamos si el rol es válido
    };
};

module.exports = rolesMiddleware;