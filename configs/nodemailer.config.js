const nodemailer = require('nodemailer');
const { emailId, emailPass } = require('./env.config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: emailId,
    pass: emailPass,
  },
});

module.exports = {
  transporter,
};
