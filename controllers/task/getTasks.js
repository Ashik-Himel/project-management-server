const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');

const getTasks = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    const { tasks } = project;
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = getTasks;
