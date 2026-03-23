const mongoose = require('mongoose');

const GrammarSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    }
});

module.exports = mongoose.model('Grammar', GrammarSchema);
