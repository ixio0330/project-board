const { Client } = require('pg');
const timestamp = require('../helper/timestamp');
require('dotenv').config();
const { cipher } = require('./cypto');

const postgres = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

postgres.connect((err) => {
  if (err) {
    console.log(`[connect] ${err}`);
  } else {
    console.log('[connect] connected');
  }
});

async function register(_login, _username, _password) {
  try {
    const { password, salt } = await cipher(_password);
    await postgres.query(
      `insert into users (login, username, password, salt, created_on) values('${_login}', '${_username}', '${password}', '${salt}', '${timestamp()}');`
    );
    return true;
  } catch (err) {
    console.log(`[db] register ${err}`);
    return false;
  }
}

async function login(_login, _password) {
  try {
    const result = await postgres.query(
      `select login, password from users where login='${_login}'`
    );
    const { password } = result.rows[0];

    if (password === _password) return true;
    return false;
  } catch (err) {
    console.log(`[db] loign ${err}`);
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

module.exports = {
  isIdExist,
  register,
  login,
};
