const express = require('express');

const router = express.Router();

const userAccess = require('../controllers/webuser');

/* Create an account */
router.post('/signup', userAccess.signup);

/* Connection */
router.post('/login', userAccess.login);

module.exports = router;