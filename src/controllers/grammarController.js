const Grammar = require('../models/Grammar');
const User = require('../models/User');

// @desc    Get grammar lessons
// @route   GET /grammar
// @access  Private
exports.getGrammarLessons = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        const lessons = await Grammar.find({ level: user.level });
        res.render('study/grammar', { lessons, level: user.level });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
