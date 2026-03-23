const User = require('../models/User');

// @desc    Register user
// @route   POST /auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const userExists = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        if (userExists) {
            return res.redirect('/register?error=exists');
        }

        const userData = { username, email, password };

        if (role === 'instructor') {
            userData.role = 'instructor';
            userData.isApproved = false;
            if (req.file) {
                userData.instructorCertificate = req.file.filename;
            }
        } else {
            userData.role = 'student';
            userData.isApproved = true;
        }

        const user = await User.create(userData);

        req.session.userId = user._id;
        req.session.userRole = user.role;

        if (user.role === 'instructor' && !user.isApproved) {
            return res.redirect('/login?error=pending');
        }

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.redirect('/register?error=server');
    }
};

// @desc    Login user
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.redirect('/login?error=invalid');
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.redirect('/login?error=invalid');
        }

        if (!user.isApproved) {
            return res.redirect('/login?error=pending');
        }

        req.session.userId = user._id;
        req.session.userRole = user.role;

        // Redirect based on role
        switch (user.role) {
            case 'admin':
                return res.redirect('/admin');
            case 'instructor':
                return res.redirect('/instructor');
            default:
                return res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/login?error=server');
    }
};

// @desc    Logout user
// @route   GET /auth/logout
// @access  Private
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.clearCookie('sid');
        res.redirect('/login');
    });
};
