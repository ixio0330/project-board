const tokenService = require('../jwt');
const BadRequest = require('../error/badrequest');
const ExpiredToken = require('../error/expiredToken');

const tokenVerify = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new BadRequest('토큰이 존재하지 않습니다.');
  }

  try {
    const payload = tokenService.getPayload(req.headers.authorization);
    req.user_id = payload.user_id;
  } catch (error) {
    throw new ExpiredToken();
  }

  next();
};

module.exports = tokenVerify;