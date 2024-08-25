const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');

const deleteProject = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const { projectId } = req.params;
    const result = await projectCollection.deleteOne({ _id: new ObjectId(projectId) });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.status(200).send({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = deleteProject;
