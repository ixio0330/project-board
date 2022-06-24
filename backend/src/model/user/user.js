const UserStorage = require('./userStorage');
const Response = require('./../../helper/response');
const ServerLogger = require('./../../helper/serverLogger');

const path = 'model > user > user.js';

class User {
  #client;

  constructor(client = {}) {
    this.#client = client;
  }

  getUserId() {
    return this.#client.login;
  }

  async login() {
    try {
      const { login, password } = this.#client;
      const result = await UserStorage.reqLogin(login, password);
      return new Response(
        result.status,
        result.isSuccess,
        result.message,
        result.data
      );
    } catch (err) {
      ServerLogger.error(`${path} > login function : ${err}`);
      return new Response(500, false, 'Server error.');
    }
  }

  async register() {
    try {
      const { login, username, password } = this.#client;
      const result = await UserStorage.reqRegister(login, username, password);
      return new Response(result.status, result.isSuccess, result.message);
    } catch (err) {
      ServerLogger.error(`${path} > register function : ${err}`);
      return new Response(500, false, 'Server error.');
    }
  }

  static async logout(_access_token) {
    if (!_access_token) {
      return new Response(500, false, 'Token does not exist.').getResponse();
    }

    try {
      const result = await UserStorage.reqLogout(_access_token);
      return new Response(result.status, result.isSuccess, result.message);
    } catch (err) {
      ServerLogger.error(`${path} > logout fuction : ${err}`);
      return new Response(500, false, 'Server error.');
    }
  }
}

module.exports = User;
