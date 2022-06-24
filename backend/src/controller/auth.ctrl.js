'use strict';

const User = require('../model/user/user');

async function loginController(req, res) {
  const user = new User(req.body);
  const result = await user.login();
  const response = result.getResponse();
  return res.json(response);
}

async function registerController(req, res) {
  const user = new User(req.body);
  const result = await user.register();
  const response = result.getResponse();
  return res.status(response.status).json(response);
}

async function logoutController(req, res) {
  const result = await User.logout(req.headers.authorization);
  const response = result.getResponse();
  return res.status(response.status).json(response);
}

module.exports = { loginController, registerController, logoutController };
