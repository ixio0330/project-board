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
    let response;

    try {
      const { login, password } = this.#client;
      const result = await UserStorage.reqLogin(login, password);
      response = new Response(result.status, result.isSuccess, result.message, [
        'token',
      ]);
    } catch (err) {
      ServerLogger.error(`${path} > login function : ${err}`);
      response = new Response(500, false, 'Server error.');
    }

    return response.getResponse();
  }

  async register() {
    let response;

    try {
      const { login, username, password } = this.#client;
      const result = await UserStorage.reqRegister(login, username, password);
      response = new Response(result.status, result.isSuccess, result.message);
    } catch (err) {
      ServerLogger.error(`${path} > register function : ${err}`);
      response = new Response(500, false, 'Server error.');
    }

    return response.getResponse();
  }
}

module.exports = User;
