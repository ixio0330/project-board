'use strict';

const User = require('../model/user/user');

async function authLogin(req, res) {
  const user = new User(req.body);
  const response = await user.login();
  return res.json(response);
}

async function authRegister(req, res) {
  const user = new User(req.body);
  const response = await user.register();
  return res.status(response.status).json(response);
}

module.exports = { authLogin, authRegister };
