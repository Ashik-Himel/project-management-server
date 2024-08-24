const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./utils/db');
const { port } = require('./configs/env.config');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'));

app.use('/api', userRoutes, projectRoutes, taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Project Management Server!');
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on the ${port} port!`);
  });
});

module.exports = app;
