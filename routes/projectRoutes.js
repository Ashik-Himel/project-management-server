const express = require('express');
const getProjects = require('../controllers/project/getProjects');
const createProject = require('../controllers/project/createProject');
const getProject = require('../controllers/project/getProject');
const updateProject = require('../controllers/project/updateProject');
const deleteProject = require('../controllers/project/deleteProject');
const assignUserInProject = require('../controllers/project/assignUserInProject');
const uploadFiles = require('../controllers/project/uploadFiles');
const verifyUser = require('../middlewares/verifyUser');
const verifyProjectMember = require('../middlewares/verifyProjectMember');

const router = express.Router();

router.get('/projects', getProjects);
router.get('projects/:projectId', getProject);
router.post('/projects', verifyUser, createProject);
router.put('projects/:projectId', verifyUser, verifyProjectMember, updateProject);
router.delete('projects/:projectId', verifyUser, verifyProjectMember, deleteProject);

router.post('/projects/:projectId/assign', verifyUser, verifyProjectMember, assignUserInProject);
router.post('/projects/:projectId/upload', verifyUser, verifyProjectMember, uploadFiles);

module.exports = router;
