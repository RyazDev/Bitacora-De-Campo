const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://cuellarvalenciabrayan:LN18iMpIpEv78Y5y@bitacoraaves.kquxg.mongodb.net/?retryWrites=true&w=majority&appName=BitacoraAves', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir del proceso si hay un error
  }
};

module.exports = connectDB;

