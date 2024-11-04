// models/Log.js

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: {
            latitude: Number,
            longitude: Number,
        },
        required: true,
    },
    climate: {
        type: String,
        required: true,
    },
    habitatDescription: {
        type: String,
        required: true,
    },
    sitePhotos: [
        {
            url: String,
            description: String,
        }
    ],
    speciesDetails: [
        {
            scientificName: String,
            commonName: String,
            family: String,
            sampleCount: Number,
            plantCondition: {
                type: String,
                enum: ['viva', 'seca', 'otro'], // Puedes añadir más estados según sea necesario
            },
            speciesPhotos: [
                {
                    url: String,
                    description: String,
                }
            ],
        }
    ],
    additionalObservations: {
        type: String,
        default: '',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de usuario que creó la bitácora
        required: true,
    },
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

module.exports = mongoose.model('Log', logSchema);
