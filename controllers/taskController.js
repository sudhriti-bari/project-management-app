const Task = require('../models/Task');

// CREATE TASK
exports.createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            project,
            assignedTo,
            dueDate
        } = req.body;

        const task = await Task.create({
            title,
            description,
            project,
            assignedTo,
            dueDate
        });

        res.status(201).json({
            message: 'Task created successfully',
            task
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET TASKS
exports.getTasks = async (req, res) => {

    try {

        const tasks = await Task.find()
        .populate('project')
        .populate('assignedTo');

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE TASK STATUS (NEW FUNCTION)
exports.updateTaskStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.status = status;

        await task.save();

        res.status(200).json({
            message: "Status updated successfully",
            task
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
exports.getDashboard = async (req, res) => {
  try {

    const tasks = await Task.find();

    const total = tasks.length;

    const pending = tasks.filter(t => t.status === "Pending").length;

    const inProgress = tasks.filter(t => t.status === "In Progress").length;

    const completed = tasks.filter(t => t.status === "Completed").length;

    res.status(200).json({
      total,
      pending,
      inProgress,
      completed
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};