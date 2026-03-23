const express = require('express');
const router = express.Router();
const { 
    getDashboard, 
    getUsers, 
    approveInstructor, 
    deleteUser, 
    getContent 
} = require('../controllers/adminController');

router.get('/', getDashboard);
router.get('/users', getUsers);
router.post('/users/:id/approve', approveInstructor);
router.post('/users/:id/delete', deleteUser);
router.get('/content', getContent);

module.exports = router;
