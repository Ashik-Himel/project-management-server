const express = require('express');
const login = require('../controllers/user/login');
const register = require('../controllers/user/register');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;
