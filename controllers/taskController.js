const Task = require('../models/Task');

// Controller for creating a new task
async function createTask(req, res) {
  const { title, details, goalTime, priority } = req.body;
  const username = req.user.username;

  try {
    // Create a new task associated with the user
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

// Controller for getting all tasks for a specific user
async function getAllTasks(req, res) {
  const username = req.user.username;

  try {
    // Get all tasks for the specific user
    const tasks = await Task.find({ username });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller for updating task status by ID
async function updateTaskStatus(req, res) {
  const taskId = req.params.taskId;
  const { status } = req.body;

  try {
    // Update the task status by ID
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

// Controller for deleting a task by ID
async function deleteTask(req, res) {
  const taskId = req.params.taskId;

  try {
    // Delete the task by ID
    const result = await Task.deleteOne({ _id: taskId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  updateTaskStatus,
  deleteTask,
};
