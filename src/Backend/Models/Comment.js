const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    logId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Log',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', commentSchema);

