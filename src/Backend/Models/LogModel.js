const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    title: { type: String, required: true },
    samplingDate: { type: Date, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    weatherConditions: { type: String, default: '' },  
    habitatDescription: { type: String, default: '' },  
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
    additionalNotes: { type: String, default: '' },  
    photos: [{ type: String }],
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,  
    },
  },
  {
    timestamps: true,  
  }
);

logSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Log', logSchema);


