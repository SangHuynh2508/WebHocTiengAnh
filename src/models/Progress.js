const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completedLessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vocabulary'
        }
    ],
    testResults: [
        {
            score: Number,
            totalQuestions: Number,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('Progress', ProgressSchema);
