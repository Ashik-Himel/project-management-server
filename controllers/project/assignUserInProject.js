const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');
const { transporter } = require('../../configs/nodemailer.config');
const { emailId } = require('../../configs/env.config');

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

    const option = {
      from: emailId,
      to: req.body.emails,
      subject: 'New Project',
      html: `<p>You are assigned to a new project</p>
      <br />
      <h4>Project</h4>
      <p>Project Title: ${project.title}</p>
      <p>Description: ${project.description}</p>`,
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

module.exports = assignUserInProject;
