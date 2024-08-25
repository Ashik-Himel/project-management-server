const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/env.config');

const verifyUser = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(403).send({ message: 'Token Missing' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyUser;
