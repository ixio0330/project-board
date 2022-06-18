const UserStorage = require('./userStorage');
const Response = require('./../../helper/response');

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
      console.log(`[user] login ${err}`);
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
      console.log(`[user] register ${err}`);
      response = new Response(500, false, 'Server error.');
    }

    return response.getResponse();
  }
}

module.exports = User;
