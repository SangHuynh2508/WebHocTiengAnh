const User = require('../models/User');
const Vocabulary = require('../models/Vocabulary');
const Grammar = require('../models/Grammar');
const Question = require('../models/Question');

// @desc    Admin dashboard
// @route   GET /admin
exports.getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'student' });
        const totalInstructors = await User.countDocuments({ role: 'instructor' });
        const pendingInstructors = await User.countDocuments({ role: 'instructor', isApproved: false });
        const totalQuestions = await Question.countDocuments();
        const totalVocabulary = await Vocabulary.countDocuments();
        const totalGrammar = await Grammar.countDocuments();

        res.render('admin/dashboard', {
            user: req.user,
            stats: { totalUsers, totalInstructors, pendingInstructors, totalQuestions, totalVocabulary, totalGrammar }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    List all users
// @route   GET /admin/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).sort({ createdAt: -1 });
        res.render('admin/users', { user: req.user, users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Approve instructor
// @route   POST /admin/users/:id/approve
exports.approveInstructor = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isApproved: true });
        res.redirect('/admin/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete user
// @route   POST /admin/users/:id/delete
exports.deleteUser = async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        if (!targetUser || targetUser.role === 'admin') {
            return res.redirect('/admin/users');
        }
        await targetUser.deleteOne();
        res.redirect('/admin/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Content management overview
// @route   GET /admin/content
exports.getContent = async (req, res) => {
    try {
        const vocabulary = await Vocabulary.find().sort({ _id: -1 }).limit(20);
        const grammar = await Grammar.find().sort({ _id: -1 });
        const questions = await Question.find().sort({ _id: -1 }).limit(20).populate('createdBy', 'username');
        res.render('admin/content', { user: req.user, vocabulary, grammar, questions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
