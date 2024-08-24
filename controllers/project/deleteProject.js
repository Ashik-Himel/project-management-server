const deleteProject = async (req, res) => {
  try {
    // TODO: write logic here
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = deleteProject;
