const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');
const { serverDomain } = require('../../configs/env.config');

const uploadFiles = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }

    const { files } = project;
    req.files.forEach((file) => files.push(`${serverDomain}/${file.filename}`));
    await projectCollection.updateOne({ _id: new ObjectId(project._id) }, { $set: { files } });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = uploadFiles;
