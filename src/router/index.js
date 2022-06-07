'use strict';

const express = require('express');
const router = express.Router();
const { authLogin, authRegister } = require('../controller/auth.ctrl');

router.get('/', (req, res) => {
  res.send({ message: 'Hello Node.js!' });
});

router.post('/api/auth-register', authRegister);
router.post('/api/auth-login', authLogin);

module.exports = router;
