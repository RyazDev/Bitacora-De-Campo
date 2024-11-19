// middleware/rolesMiddleware.js
const rolesMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role;  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
      }
      next();  
    };
  };
  
  module.exports = rolesMiddleware;