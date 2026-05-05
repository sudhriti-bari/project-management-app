const Project = require('../models/Project');

exports.createProject = async (req, res) => {

    try {

        const { title, description, teamMembers } = req.body;

        const project = await Project.create({

            title,
            description,
            teamMembers,
            createdBy: req.user.id

        });

        res.status(201).json({
            message: 'Project created successfully',
            project
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};