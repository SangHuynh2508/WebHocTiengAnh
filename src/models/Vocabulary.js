const mongoose = require('mongoose');

const VocabularySchema = new mongoose.Schema({
    word: {
        type: String,
        required: [true, 'Please add a word'],
        trim: true
    },
    definition: {
        type: String,
        required: [true, 'Please add a definition']
    },
    vietnameseMeaning: {
        type: String,
        required: [true, 'Please add a Vietnamese meaning']
    },
    example: {
        type: String
    },
    topic: {
        type: String,
        required: [true, 'Please add a topic']
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    }
});

module.exports = mongoose.model('Vocabulary', VocabularySchema);
