// Middleware/validationMiddleware.js
const { body, validationResult } = require('express-validator');

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

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};

exports.validateRegisterUser = [...validateUserRegistration(), handleValidationErrors];
exports.validateLoginUser = [...validateUserLogin(), handleValidationErrors];
