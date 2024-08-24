require('dotenv').config();

const emailId = process.env.EMAIL_ID;
const emailPass = process.env.EMAIL_PASS;
const serverDomain = process.env.SERVER_DOMAIN;
const port = process.env.PORT || 3000;
const uri = process.env.DB_URI || 'mongodb://localhost:27017';
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  emailId,
  emailPass,
  serverDomain,
  port,
  uri,
  jwtSecret,
};
