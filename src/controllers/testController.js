const Question = require('../models/Question');
const User = require('../models/User');
const Progress = require('../models/Progress');

// @desc    Get assessment questions
// @route   GET /test
// @access  Private
exports.getTest = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        const questions = await Question.find({ level: user.level }).limit(5); // Get 5 random questions for brevity
        res.render('study/test', { questions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Submit assessment and get score
// @route   POST /test/submit
// @access  Private
exports.submitTest = async (req, res) => {
    try {
        const userAnswers = req.body.answers; // Expects object { questionId: answer }
        if (!userAnswers) return res.redirect('/test');
        
        let score = 0;
        let total = 0;

        for (const [id, answer] of Object.entries(userAnswers)) {
            const question = await Question.findById(id);
            if (question && question.correctAnswer === answer) {
                score++;
            }
            total++;
        }

        // Save progress
        let progress = await Progress.findOne({ user: req.session.userId });
        if (!progress) {
            progress = new Progress({ user: req.session.userId });
        }
        
        progress.testResults.push({
            score,
            totalQuestions: total,
            date: new Date()
        });
        
        await progress.save();

        res.render('study/result', { score, total });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
