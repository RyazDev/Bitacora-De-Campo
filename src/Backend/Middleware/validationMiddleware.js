// Middleware/validationMiddleware.js
const { body, validationResult } = require('express-validator');

// Validaciones de registro de usuario
const validateUserRegistration = () => {
    return [
        body('username')
            .isLength({ min: 3 })
            .withMessage('El nombre de usuario debe tener al menos 3 caracteres.')
            .isAlphanumeric()
            .withMessage('El nombre de usuario debe contener solo caracteres alfanuméricos.'),
        body('email')
            .isEmail()
            .withMessage('Debes proporcionar un email válido.'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('La contraseña debe tener al menos 6 caracteres.')
            .matches(/[0-9]/)
            .withMessage('La contraseña debe contener al menos un número.')
            .matches(/[a-z]/)
            .withMessage('La contraseña debe contener al menos una letra minúscula.')
            .matches(/[A-Z]/)
            .withMessage('La contraseña debe contener al menos una letra mayúscula.'),
        body('role')
            .isIn(['administrador', 'investigador', 'colaborador'])
            .withMessage('El rol debe ser uno de los siguientes: administrador, investigador, colaborador.')
    ];
};

// Validaciones de inicio de sesión de usuario
const validateUserLogin = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('Debes proporcionar un email válido.'),
        body('password')
            .notEmpty()
            .withMessage('La contraseña es requerida.')
    ];
};

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Exportar las funciones de validación
exports.validateRegisterUser = [...validateUserRegistration(), handleValidationErrors];
exports.validateLoginUser = [...validateUserLogin(), handleValidationErrors];
