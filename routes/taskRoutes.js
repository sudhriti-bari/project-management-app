const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); // 👈 ADD THIS

const {
    createTask,
    getTasks,
    updateTaskStatus,
    getDashboard
} = require('../controllers/taskController');

// Admin only
router.post('/', authMiddleware, adminMiddleware, createTask);

// Status update (user/admin both)
router.patch('/:id/status', authMiddleware, updateTaskStatus);

// Admin only dashboard
router.get('/dashboard', authMiddleware, adminMiddleware, getDashboard);

// All logged in users
router.get('/', authMiddleware, getTasks);

module.exports = router;