const { ObjectId } = require('mongodb');
const { getProjectCollection, getUserCollection } = require('../../utils/db');
const { emailId } = require('../../configs/env.config');
const { transporter } = require('../../configs/nodemailer.config');

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

    const option = {
      from: emailId,
      to: user.email,
      subject: 'New Project',
      html: `<p>You created a new project</p>
      <br />
      <h4>Project</h4>
      <p>Project Title: ${req.body.title}</p>
      <p>Description: ${req.body.description}</p>`,
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

module.exports = createProject;
