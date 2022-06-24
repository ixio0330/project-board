const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECREAT_KEY;
const ServerLogger = require('./../helper/serverLogger');
const path = 'config > token.js';

const config = {
  type: process.env.JWT_TYPE,
  alg: process.env.JWT_ALG,
};
const accessTokenConfig = {
  expiresIn: process.env.JWT_ACCESS_EXP,
  issuer: process.env.JWT_ISSUER,
  algorithm: process.env.JWT_ALG,
};
const refreshTokenConfig = {
  expiresIn: process.env.JWT_REFRESH_EXP,
  issuer: process.env.JWT_ISSUER,
  algorithm: process.env.JWT_ALG,
};

const makeToken = (_login) => {
  const accessToken = jwt.sign(config, SECRET_KEY, {
    ...accessTokenConfig,
    audience: _login,
  });

  const refreshToken = jwt.sign(config, SECRET_KEY, {
    ...refreshTokenConfig,
    audience: _login,
  });

  return { accessToken, refreshToken };
};

const checkToken = (_token) => {
  try {
    return jwt.verify(_token, SECRET_KEY);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      ServerLogger.info(`${path} checkToken function : 토근이 만료되었습니다.`);
    }

    if (err.name === 'JsonWebTokenError') {
      ServerLogger.info(
        `${path} checkToken function : 유효하지 않은 토큰입니다.`
      );
    }
  }
};

module.exports = { makeToken, checkToken };
