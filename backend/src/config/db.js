const { Client } = require('pg');
const timestamp = require('../helper/timestamp');
require('dotenv').config();
const { cipher } = require('./cypto');
const { decipher } = require('./cypto');

const ServerLogger = require('./../helper/serverLogger');
const { makeToken } = require('./token');

const path = 'config > db.js';

const postgres = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

postgres.connect((err) => {
  if (err) {
    ServerLogger.error(`${path}> postgres.connect : ${err}`);
  } else {
    ServerLogger.info('Connected to postgres.');
  }
});

// auth
async function register(_login, _username, _password) {
  try {
    const { password, salt } = await cipher(_password);
    await postgres.query(
      `insert into users (login, username, password, salt, created_on) values('${_login}', '${_username}', '${password}', '${salt}', '${timestamp()}');`
    );
    return true;
  } catch (err) {
    ServerLogger.error(`${path} > register function : ${err}`);
    return false;
  }
}

async function login(_login, _password) {
  try {
    const result = await postgres.query(
      `select id, password, salt from users where login='${_login}'`
    );
    const { id, password, salt } = result.rows[0];
    const hashPassword = await decipher(_password, salt);

    if (password === hashPassword) {
      const { accessToken, refreshToken } = makeToken(_login);
      return saveToken(id, accessToken, refreshToken)
        ? { accessToken, refreshToken }
        : false;
    }

    return false;
  } catch (err) {
    ServerLogger.error(`${path} > login function : ${err}`);
  }
}

async function isIdExist(_login) {
  try {
    const result = await postgres.query(
      `select login from users where login='${_login}';`
    );
    if (result.rows.length === 0) return false;
    return true;
  } catch (err) {
    return true;
  }
}

async function logout() {
  // token 삭제
}

// token
async function saveToken(_user_id, _access_token, _refresh_token) {
  try {
    await postgres.query(
      `insert into tokens (user_id, access_token, refresh_token) values('${_user_id}', '${_access_token}', '${_refresh_token}');`
    );
    return true;
  } catch (err) {
    ServerLogger.error(`${path} > saveToken function : ${err}`);
    return false;
  }
}

async function getAccessToken() {}

async function getRefreshToken() {}

module.exports = {
  isIdExist,
  register,
  login,
};
