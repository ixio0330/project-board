const { Client } = require('pg');
const timestamp = require('../helper/timestamp');
require('dotenv').config();
const { cipher, decipher } = require('./cypto');

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

async function logout(_access_token) {
  // token 삭제
  try {
    deleteToken(_access_token);
    return true;
  } catch (err) {
    ServerLogger.error(`${path} > logout function : ${err}`);
    return false;
  }
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

async function isTokenExist(_login) {
  try {
    const userId = await postgres.query(
      `select id from users where login='${_login}'`
    );
    const user_id = userId.rows[0].id;

    const result = await postgres.query(
      `select id from tokens where user_id='${user_id}'`
    );

    if (result.rowCount > 0) {
      return true;
    }
    return false;
  } catch (err) {
    ServerLogger.error(`${path} > isTokenExist function : ${err}`);
    return false;
  }
}

async function setAccessToken(_token_id, _new_access_token) {
  try {
    await postgres.query(`
    update tokens set access_token='${_new_access_token}' where id='${_token_id}';`);
    return true;
  } catch (err) {
    ServerLogger.error(`${path} > setAccessToken function : ${err}`);
    return false;
  }
}

async function getRefreshToken(_refresh_token) {
  try {
    const result = await postgres.query(
      `select id, refresh_token from tokens where refresh_token='${_refresh_token}';`
    );
    return result.rows[0];
  } catch (err) {
    ServerLogger.error(`${path} > getRefreshToken function : ${err}`);
    return false;
  }
}

async function deleteToken(_access_token) {
  try {
    await postgres.query(
      `delete from tokens where access_token='${_access_token}';`
    );
    return true;
  } catch (err) {
    ServerLogger.error(`${path} > deleteToken function : ${err}`);
    return false;
  }
}

module.exports = {
  isIdExist,
  isTokenExist,
  register,
  login,
  logout,
};
