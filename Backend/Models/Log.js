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
    // Agrega otros campos según tus necesidades
});

module.exports = mongoose.model('Log', logSchema);
