const User = require('../models/User');

// @desc    Get user profile
// @route   GET /profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.render('dashboard/profile', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Update user level
// @route   POST /profile/level
// @access  Private
exports.updateLevel = async (req, res) => {
    try {
        const { level } = req.body;
        
        await User.findByIdAndUpdate(req.session.userId, { level });
        
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
