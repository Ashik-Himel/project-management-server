const { getProjectCollection } = require('../../utils/db');

const getProjects = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const projects = await projectCollection.find().toArray();
    res.send(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = getProjects;
