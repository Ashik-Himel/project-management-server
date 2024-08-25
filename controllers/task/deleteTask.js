/* eslint-disable array-callback-return */
/* eslint-disable comma-dangle */
const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');

const deleteTask = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }

    const { tasks } = project;
    const updatedTasks = tasks.filter((task) => task._id.toString() !== req.params.taskId);
    await projectCollection.updateOne(
      { _id: new ObjectId(req.params.projectId) },
      { $set: { tasks: updatedTasks } }
    );
    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = deleteTask;
