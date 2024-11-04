// config.js
const config = {
    PORT: process.env.PORT || 5000, // Puerto del servidor, toma el valor de la variable de entorno o 5000 por defecto
    MONGODB_URI: process.env.DB_URI || 'mongodb+srv://cuellarvalenciabrayan:LN18iMpIpEv78Y5y@bitacoraaves.kquxg.mongodb.net/?retryWrites=true&w=majority&appName=BitacoraAves', // URI de MongoDB, toma el valor de la variable de entorno o el predeterminado
    JWT_SECRET: process.env.JWT_SECRET || '781971461623', // Clave secreta para JWT, puede ser configurada en el archivo .env
};

// Exportar la configuración para que esté disponible en otras partes de la aplicación
module.exports = config;
