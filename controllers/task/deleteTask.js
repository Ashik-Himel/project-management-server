/* eslint-disable array-callback-return */
/* eslint-disable comma-dangle */
const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');
const { emailId } = require('../../configs/env.config');
const { transporter } = require('../../configs/nodemailer.config');

const deleteTask = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    const { title, description, members } = project;

    const { tasks } = project;
    const updatedTasks = tasks.filter((task) => task._id.toString() !== req.params.taskId);
    await projectCollection.updateOne(
      { _id: new ObjectId(req.params.projectId) },
      { $set: { tasks: updatedTasks } }
    );
    res.status(200).send({ message: 'Task deleted successfully' });

    const option = {
      from: emailId,
      to: members,
      subject: 'Task deleted from a project',
      html: `<p>A task deleted from the following project:</p>
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

module.exports = deleteTask;
