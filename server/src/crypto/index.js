const { randomBytes, pbkdf2 } = require('crypto');
const { promisify } = require('util');

const randomBytesPromise = promisify(randomBytes);
const pbkdf2Promise = promisify(pbkdf2);

const createSalt = async () => {
  const buf = await randomBytesPromise(65);
  return buf.toString('base64');
}

const crypto = {
  createHashedPassword: async (password) => {
    const salt = await createSalt();
    const key = await pbkdf2Promise(password, salt, 104906, 64, 'sha512');
    const hashPassword = key.toString('base64');
    return {
      hashPassword, 
      salt
    };
  },
  verifyPassword: async ({ hashPassword, password, salt }) => {
    const key = await pbkdf2Promise(password, salt, 104906, 64, 'sha512');
    const hashedPassword = key.toString('base64');
    return hashPassword === hashedPassword;
  },
};

module.exports = crypto;