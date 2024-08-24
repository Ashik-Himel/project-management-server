const { MongoClient, ServerApiVersion } = require('mongodb');
const { uri } = require('../configs/env.config');

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let userCollection;

const connectDB = async () => {
  await client.connect();
  await client.db('admin').command({ ping: 1 });
  console.log('Database Connected!');

  const database = client.db('project-management');
  userCollection = database.collection('users');
};

const getUserCollection = () => userCollection;

module.exports = {
  connectDB,
  getUserCollection,
};
