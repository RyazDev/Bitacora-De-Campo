// middleware/rolesMiddleware.js
const rolesMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        // Verificamos si el rol del usuario (req.role) está dentro de los roles permitidos
        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({ message: 'Acceso denegado. Rol no permitido.' });
        }
        next(); // Continuamos si el rol es válido
    };
};

module.exports = rolesMiddleware;


