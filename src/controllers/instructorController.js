const Question = require('../models/Question');

// @desc    Instructor dashboard
// @route   GET /instructor
exports.getDashboard = async (req, res) => {
    try {
        const totalQuestions = await Question.countDocuments({ createdBy: req.user._id });
        res.render('instructor/dashboard', { 
            user: req.user, 
            totalQuestions 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    List instructor's questions
// @route   GET /instructor/questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ createdBy: req.user._id }).sort({ _id: -1 });
        res.render('instructor/questions', { 
            user: req.user, 
            questions 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Show create question form
// @route   GET /instructor/questions/create
exports.createQuestionForm = (req, res) => {
    res.render('instructor/create-question', { user: req.user });
};

// @desc    Create a new question
// @route   POST /instructor/questions
exports.createQuestion = async (req, res) => {
    try {
        const { questionText, option1, option2, option3, option4, correctAnswer, level, topic } = req.body;

        await Question.create({
            questionText,
            options: [option1, option2, option3, option4],
            correctAnswer,
            level,
            topic: topic || 'General',
            createdBy: req.user._id
        });

        res.redirect('/instructor/questions');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a question
// @route   POST /instructor/questions/:id/delete
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).send('Question not found.');
        }

        if (question.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send('You do not have permission to delete this question.');
        }

        await question.deleteOne();
        res.redirect('/instructor/questions');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
