const jwt = require('jsonwebtoken');

const tokenService = {
  getToken(user_id) {
  return jwt.sign({ user_id }, 'SECRET_KEY', {
      expiresIn: '1d'
    });
  },
  getPayload(token) {
    return jwt.verify(token, 'SECRET_KEY');
  }
}

module.exports = tokenService;