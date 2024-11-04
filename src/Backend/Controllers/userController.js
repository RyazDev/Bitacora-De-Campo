// Controllers/userController.js
const User = require('../Models/User'); // Asegúrate de crear el modelo User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username }); // Cambia a buscar por username
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'El email ya está en uso.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        // Manejo de errores de duplicados
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El nombre de usuario o email ya están en uso.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Generar token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Datos de entrada inválidos.', errors: error.errors });
        }
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios.', error: error.message });
    }
};

// Implementa aquí la lógica para actualizar y eliminar usuarios
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Asegúrate de validar los datos antes

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario.', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario.', error: error.message });
    }
};
