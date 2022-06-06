const UserStorage = require('./userStorage');
const Response = require('./../../helper/response');
/*
Login
<Request>
URL: /api/auth-login
Method: POST
Body: {
	login: id,
	password: password
}

<Response>
Body: {
	isSuccess: boolean,
	message: string,
	data: [ token: string ]
}
*/

class User {
  #client;

  constructor(client = {}) {
    this.#client = client;
  }

  async login() {
    let response;

    try {
      const { login, password } = this.#client;
      UserStorage.reqLogin(login, password);
      response = new Response(true, 'Login successfully.');
    } catch (err) {
      console.log(err);
      response = new Response(false, 'Bad request');
    }

    return response.getResponse();
  }

  async register() {
    let response;

    try {
      const { login, username, password } = this.#client;
      const result = await UserStorage.reqRegister(login, username, password);

      if (result.isSuccess) {
        response = new Response(
          result.status,
          result.isSuccess,
          result.message
        );
      } else {
        response = new Response(
          result.status,
          result.isSuccess,
          result.message
        );
      }
    } catch (err) {
      console.log(`[user] register ${err}`);
      response = new Response(500, false, 'Server error.');
    }

    return response.getResponse();
  }
}

module.exports = User;
