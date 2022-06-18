'use strict';

const express = require('express');

const router = express.Router();
const {
  loginController,
  registerController,
} = require('../controller/auth.ctrl');

router.get('/', (req, res) => {
  res.send({ message: 'Hello Node.js!' });
});

router.post('/api/auth-register', registerController);
router.post('/api/auth-login', loginController);

module.exports = router;
