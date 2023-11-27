const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/newtask',authenticateToken,taskController.createTask);
router.get('/alltask',authenticateToken,taskController.getAllTasks);
router.put('/updatetask/:taskId', authenticateToken, taskController.updateTaskStatus);
router.delete('/deletetask/:taskId',authenticateToken,taskController.deleteTask);
router.get('/pendingtasks',authenticateToken,taskController.pendingTasks);

module.exports = router;