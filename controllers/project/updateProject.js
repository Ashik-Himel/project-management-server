/* eslint-disable prettier/prettier */
const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');

const updateProject = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();

    const document = {
      title: req.body.title,
      description: req.body.description,
    };

    await projectCollection.updateOne(
      { _id: new ObjectId(req.params.projectId) },
      { $set: document },
    );
    res.status(200).send({ message: 'Project updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = updateProject;
