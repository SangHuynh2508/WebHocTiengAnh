const express = require('express');
const router = express.Router();
const { getTest, submitTest } = require('../controllers/testController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getTest);
router.post('/submit', protect, submitTest);

module.exports = router;
