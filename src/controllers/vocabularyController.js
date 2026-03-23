const Vocabulary = require('../models/Vocabulary');
const User = require('../models/User');

// @desc    Get vocabulary lessons by topic
// @route   GET /vocabulary
// @access  Private
exports.getTopics = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        const topics = await Vocabulary.distinct('topic', { level: user.level });
        res.render('study/topics', { topics, level: user.level });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Get words for a specific topic
// @route   GET /vocabulary/:topic
// @access  Private
exports.getWordsByTopic = async (req, res) => {
    try {
        const { topic } = req.params;
        const user = await User.findById(req.session.userId);
        const words = await Vocabulary.find({ topic, level: user.level });
        res.render('study/vocabulary', { topic, words });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
