const express = require('express');
const router = express.Router();
const { 
    getDashboard, 
    getQuestions, 
    createQuestionForm, 
    createQuestion, 
    deleteQuestion 
} = require('../controllers/instructorController');

router.get('/', getDashboard);
router.get('/questions', getQuestions);
router.get('/questions/create', createQuestionForm);
router.post('/questions', createQuestion);
router.post('/questions/:id/delete', deleteQuestion);

module.exports = router;
