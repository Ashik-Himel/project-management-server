const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');

const createTask = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();

    const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }

    const { tasks } = project;
    const newTask = {
      _id: new ObjectId(),
      title: req.body.title,
      description: req.body.description,
      member: null,
    };
    tasks.push(newTask);

    await projectCollection.updateOne({ _id: new ObjectId(project._id) }, { $set: { tasks } });
    res.status(200).send({ message: 'Task added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = createTask;
