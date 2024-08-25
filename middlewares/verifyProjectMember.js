const { ObjectId } = require('mongodb');
const { getUserCollection, getProjectCollection } = require('../utils/db');

const verifyProjectMember = async (req, res, next) => {
  const userCollection = getUserCollection();
  const projectCollection = getProjectCollection();

  const user = await userCollection.findOne({ _id: new ObjectId(req.user.id) });
  const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });

  if (!user || !project) {
    return res.status(404).send({ message: 'Project or user not found' });
  }

  let userMatched = false;
  project.members.forEach((email) => {
    if (email === user.email) {
      userMatched = true;
      return null;
    }
  });

  if (userMatched) next();
};

module.exports = verifyProjectMember;
