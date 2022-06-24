'use strict';

const express = require('express');

const router = express.Router();
const {
  loginController,
  registerController,
  logoutController,
} = require('../controller/auth.ctrl');

router.get('/', (req, res) => {
  res.send({ message: 'Hello Node.js!' });
});

router.post('/api/register', registerController);
router.post('/api/login', loginController);
router.post('/api/logout', logoutController);

module.exports = router;
