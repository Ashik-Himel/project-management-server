const { ObjectId } = require('mongodb');
const { getProjectCollection, getUserCollection } = require('../../utils/db');
const { emailId } = require('../../configs/env.config');
const { transporter } = require('../../configs/nodemailer.config');

const deleteProject = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const userCollection = getUserCollection();
    const { projectId } = req.params;

    const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
    const { title, description, members } = project;

    const result = await projectCollection.deleteOne({ _id: new ObjectId(projectId) });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.status(200).send({ message: 'Project deleted successfully' });

    const user = await userCollection.findOne({ _id: new ObjectId(req.user.id) });
    const option = {
      from: emailId,
      to: members,
      subject: 'Project deleted',
      html: `<p>${user.name} deleted the following project:</p>
      <br />
      <h4>Project</h4>
      <p>Project Title: ${title}</p>
      <p>Description: ${description}</p>`,
    };
    transporter.sendMail(option, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return;
      }
      console.log('Email sent:', info.response);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = deleteProject;
