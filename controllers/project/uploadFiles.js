const { ObjectId } = require('mongodb');
const { getProjectCollection } = require('../../utils/db');
const { serverDomain, emailId } = require('../../configs/env.config');
const { transporter } = require('../../configs/nodemailer.config');

const uploadFiles = async (req, res) => {
  try {
    const projectCollection = getProjectCollection();
    const project = await projectCollection.findOne({ _id: new ObjectId(req.params.projectId) });
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    const { members, title, description } = project;

    const { files } = project;
    req.files.forEach((file) => files.push(`${serverDomain}/${file.filename}`));
    await projectCollection.updateOne({ _id: new ObjectId(project._id) }, { $set: { files } });
    res.status(200).send({ message: 'Files uploaded successfully' });

    const option = {
      from: emailId,
      to: members,
      subject: 'Files uploaded in the project',
      html: `<p>New files uploaded in the following project:</p>
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

module.exports = uploadFiles;
