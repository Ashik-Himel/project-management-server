/* eslint-disable comma-dangle */
const express = require('express');
const getTasks = require('../controllers/task/getTasks');
const createTask = require('../controllers/task/createTask');
const updateTask = require('../controllers/task/updateTask');
const deleteTask = require('../controllers/task/deleteTask');
const assignUserInTask = require('../controllers/task/assignUserInTask');
const verifyUser = require('../middlewares/verifyUser');
const verifyProjectMember = require('../middlewares/verifyProjectMember');

const router = express.Router();

router.get('/projects/:projectId/tasks', verifyUser, verifyProjectMember, getTasks);
router.post('/projects/:projectId/tasks', verifyUser, verifyProjectMember, createTask);
router.put('/projects/:projectId/tasks/:taskId', verifyUser, verifyProjectMember, updateTask);
router.delete('/projects/:projectId/tasks/:taskId', verifyUser, verifyProjectMember, deleteTask);

router.post(
  '/projects/:projectId/tasks/:taskId/assign',
  verifyUser,
  verifyProjectMember,
  assignUserInTask
);

module.exports = router;
