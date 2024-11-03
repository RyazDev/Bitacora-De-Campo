// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true, // Asegúrate de que este campo es requerido
  },
  email: {
    type: String,
    required: true, // Asegúrate de que este campo es requerido
    unique: true,    // Puedes agregar esto si quieres que el email sea único
  },
  contraseña: {
    type: String,
    required: true, // Asegúrate de que este campo es requerido
  }
});

module.exports = mongoose.model('User', userSchema);
