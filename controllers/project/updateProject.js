/* eslint-disable prettier/prettier */
const { ObjectId } = require('mongodb');
const { getProjectCollection, getUserCollection } = require('../../utils/db');
const { emailId } = require('../../configs/env.config');
const { transporter } = require('../../configs/nodemailer.config');

const updateProject = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const userCollection = getUserCollection();
    const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });
    const { title, description, members } = project;

    const document = {
      title: req.body.title,
      description: req.body.description,
    };

    await projectCollection.updateOne(
      { _id: new ObjectId(req.params.projectId) },
      { $set: document },
    );
    res.status(200).send({ message: 'Project updated successfully' });

    const user = await userCollection.findOne({ _id: new ObjectId(req.user.id) });
    const option = {
      from: emailId,
      to: members,
      subject: 'Project updated',
      html: `<p>${user.name} updated the following project:</p>
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

module.exports = updateProject;
