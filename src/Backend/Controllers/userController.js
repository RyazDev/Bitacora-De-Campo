// Controllers/userController.js
const User = require('../Models/User'); // Asegúrate de crear el modelo User
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ errors: ['El nombre de usuario o el email ya están en uso.'] });
        }

        const user = new User({
            username,
            email,
            password,
            role
        });

        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ['Error al registrar el usuario.'] });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
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


exports.updateUser = async (req, res) => {
    const { identifier } = req.params;  
    const updates = req.body; 

    let user;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
        user = await User.findById(identifier);
    } else {
        user = await User.findOne({ email: identifier });
    }

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if (updates.email && updates.email === user.email) {
        return res.status(400).json({ message: 'El correo electrónico es el mismo y no necesita actualización.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, updates, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario.', error: error.message });
    }
};



exports.deleteUser = async (req, res) => {
    const { identifier } = req.params; 

    try {
        let user;

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            user = await User.findByIdAndDelete(identifier);
        } else {
            user = await User.findOneAndDelete({ email: identifier });
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({
            message: `Usuario ${user.email} con ID ${user._id} ha sido eliminado con éxito.`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario.', error: error.message });
    }
};

