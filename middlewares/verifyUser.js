/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/env.config');

const verifyUser = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(403).send({ message: 'Token Missing' });
  }

  jwt.verify(token, jwtSecret, (err, decode) => {
    if (err || req.headers?.authorization !== decode?.email) {
      return res.status(401).send({ message: 'Unauthorize access' });
    }

    req.userEmail = decode?.email;
    next();
  });
};

module.exports = verifyUser;
