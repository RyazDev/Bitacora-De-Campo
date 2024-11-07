const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de la bitácora
const logSchema = new Schema(
  {
    title: { type: String, required: true },  // Título de la bitácora
    samplingDate: { type: Date, required: true },  // Fecha de muestreo
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },  // Tipo de la ubicación (geoespacial)
      coordinates: { type: [Number], required: true },  // Coordenadas geográficas [longitud, latitud]
    },
    weatherConditions: { type: String },  // Condiciones meteorológicas
    habitatDescription: { type: String },  // Descripción del hábitat
    speciesCollected: [
      {
        scientificName: { type: String },  // Nombre científico
        commonName: { type: String },  // Nombre común
        family: { type: String },  // Familia botánica
        sampleCount: { type: Number },  // Conteo de muestras recolectadas
        plantState: { type: String },  // Estado de la planta (Viva, Seca, etc.)
        photos: [{ type: String }],  // URLs de fotos asociadas a la especie
      },
    ],
    additionalNotes: { type: String },  // Notas adicionales
    photos: [{ type: String }],  // URLs de fotos del sitio de muestreo
  },
  {
    timestamps: true,  // Guardar las fechas de creación y actualización
  }
);

// Indicar que la localización será geoespacial (index geoespacial)
logSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Log', logSchema);  // Exportar el modelo de la bitácora


