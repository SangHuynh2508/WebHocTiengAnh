const User = require('../models/User');

// Protect routes - must be logged in
exports.protect = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

// Guest only - redirect if logged in
exports.guest = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    next();
};

// Authorize by role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.session.userRole || !roles.includes(req.session.userRole)) {
            return res.status(403).send('You do not have permission to access this page.');
        }
        next();
    };
};

// Load full user object into req.user and res.locals
exports.loadUser = async (req, res, next) => {
    res.locals.user = null;
    res.locals.userRole = null;
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (user) {
                req.user = user;
                res.locals.user = user;
                res.locals.userRole = user.role;
            }
        } catch (err) {
            console.error('Load user error:', err.message);
        }
    }
    next();
};
