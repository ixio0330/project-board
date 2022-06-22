const crypto = require('crypto');

const createSalt = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) buf(err);
      resolve(buf.toString('base64'));
    });
  });

const cipher = (password) =>
  new Promise((resolve, reject) => {
    createSalt()
      .then((salt) => {
        crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
          if (err) reject(err);
          resolve({ password: key.toString('base64'), salt });
        });
      })
      .catch(console.log);
  });

const decipher = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve(key.toString('base64'));
    });
  });

module.exports = { cipher, decipher };
