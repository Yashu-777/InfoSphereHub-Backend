const Task = require('../models/Task');
const User = require('../models/User');

async function createTask(req, res) {
  const { title, details, goalTime, priority } = req.body;
  const username = req.user.username;

  try {
    const task = new Task({
      title,
      details,
      goalTime,
      priority,
      username,
    });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllTasks(req, res) {
  const username = req.user.username;

  try {
    const tasks = await Task.find({ username });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateTaskStatus(req, res) {
  const taskId = req.params.taskId;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTask(req, res) {
  const taskId = req.params.taskId;

  try {
    const result = await Task.deleteOne({ _id: taskId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function pendingTasks(req,res) {
  try{
    if(!req.user.username) {
      return res.status(404).json({message:'User not found'});
    }

    const taskCount = await Task.countDocuments({username:req.user.username,status:false});
    res.json({pendingTasks: taskCount});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = {
  createTask,
  getAllTasks,
  updateTaskStatus,
  deleteTask,
  pendingTasks,
};
