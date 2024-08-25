/* eslint-disable comma-dangle */
const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');

const updateTask = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }

    const { tasks } = project;
    const updatedTasks = tasks.map((task) => {
      if (task._id.toString() === req.params.taskId) {
        return {
          ...task,
          ...req.body,
        };
      }
      return task;
    });
    await projectCollection.updateOne(
      { _id: new ObjectId(project._id) },
      { $set: { tasks: updatedTasks } }
    );
    res.status(200).send({ message: 'Task updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = updateTask;
