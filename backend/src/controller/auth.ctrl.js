'use strict';

const User = require('../model/user/user');

async function loginController(req, res) {
  const user = new User(req.body);
  const response = await user.login();
  return res.json(response);
}

async function registerController(req, res) {
  const user = new User(req.body);
  const response = await user.register();
  return res.status(response.status).json(response);
}

module.exports = { loginController, registerController };
