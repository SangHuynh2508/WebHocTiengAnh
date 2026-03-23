const express = require('express');
const router = express.Router();
const { getTopics, getWordsByTopic } = require('../controllers/vocabularyController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getTopics);
router.get('/:topic', protect, getWordsByTopic);

module.exports = router;
