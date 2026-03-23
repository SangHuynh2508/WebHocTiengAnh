const express = require('express');
const router = express.Router();
const { getProfile, updateLevel } = require('../controllers/userController');
const { getProgress } = require('../controllers/progressController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getProfile);
router.get('/progress', protect, getProgress);
router.post('/level', protect, updateLevel);

module.exports = router;
