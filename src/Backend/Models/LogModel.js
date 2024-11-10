const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de la bitácora
const logSchema = new Schema(
  {
    title: { type: String, required: true },
    samplingDate: { type: Date, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    weatherConditions: { type: String, default: '' },  // Hacer opcional
    habitatDescription: { type: String, default: '' },  // Hacer opcional
    speciesCollected: [
      {
        scientificName: { type: String },
        commonName: { type: String },
        family: { type: String },
        sampleCount: { type: Number },
        plantState: { type: String },
        photos: [{ type: String }],
      },
    ],
    additionalNotes: { type: String, default: '' },  // Hacer opcional
    photos: [{ type: String }],
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,  // Asegúrate de que este campo sea obligatorio
    },
  },
  {
    timestamps: true,  // Agregar timestamps automáticamente para crear y actualizar
  }
);

// Indicar que la localización será geoespacial (index geoespacial)
logSchema.index({ location: '2dsphere' });

// Exportar el modelo de la bitácora
module.exports = mongoose.model('Log', logSchema);


