const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../configs/env.config');
const { getUserCollection } = require('../../utils/db');

const login = async (req, res) => {
  try {
    const userCollection = getUserCollection();
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'Missing email or password' });
    }

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = login;
