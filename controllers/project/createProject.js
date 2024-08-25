const { ObjectId } = require('mongodb');
const { getProjectCollection, getUserCollection } = require('../../utils/db');

const createProject = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const userCollection = getUserCollection();
    const user = await userCollection.findOne({ _id: new ObjectId(req.user.id) });

    const project = {
      title: req.body.title,
      description: req.body.description,
      members: [user.email],
      tasks: [],
      files: [],
    };

    await projectCollection.insertOne(project);
    res.status(201).send({ message: 'Project created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = createProject;
