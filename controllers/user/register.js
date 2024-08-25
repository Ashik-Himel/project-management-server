const bcrypt = require('bcrypt');
const { getUserCollection } = require('../../utils/db');

const register = async (req, res) => {
  try {
    const userCollection = getUserCollection();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'Email already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashPassword };
    await userCollection.insertOne(user);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = register;
