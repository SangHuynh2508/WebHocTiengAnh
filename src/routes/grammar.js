const express = require('express');
const router = express.Router();
const { getGrammarLessons } = require('../controllers/grammarController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getGrammarLessons);

module.exports = router;
