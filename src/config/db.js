const { Client } = require('pg');
const timestamp = require('../helper/timestamp');
require('dotenv').config();

// .env 앞에 다른 이름을 붙였을 경우
// require('dotenv').config({ path: path.join(__dirname, '/env/production.env') });

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

async function register(login, username, password) {
  try {
    await postgres.query(
      `insert into users (login, username, password, created_on) values('${login}', '${username}', '${password}', '${timestamp()}');`
    );
  } catch (err) {
    console.log(`[register] ${err}`);
  } finally {
    // postgres.end();
  }
}

async function isIdExist(login) {
  try {
    const result = await postgres.query(
      `select login from users where login='${login}';`
    );
    if (result.rows.length === 0) return false;
    return true;
  } catch (err) {
    return true;
  } finally {
    // postgres.end();
  }
}

module.exports = {
  register,
  isIdExist,
};
