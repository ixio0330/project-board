'use strict';

const express = require('express');
const { queryTest } = require('../config/db');
const router = express.Router();
const { authLogin, authRegister } = require('../controller/auth.ctrl');

router.get('/', (req, res) => {
  res.send({ message: 'Hello Node.js!' });
});

router.post('/api/auth-register', authRegister);

module.exports = router;
