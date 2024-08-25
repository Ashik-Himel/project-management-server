const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');

const assignUserInProject = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();

    const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }

    const { members } = project;
    req.body.emails.forEach((email) => members.push(email));

    await projectCollection.updateOne({ _id: new ObjectId(project._id) }, { $set: { members } });
    res.status(200).send({ message: 'User assigned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = assignUserInProject;
