const verifyProjectMember = (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  next();
};

module.exports = verifyProjectMember;
