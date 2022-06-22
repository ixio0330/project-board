const { register, isIdExist, login } = require('../../config/db');
const { string } = require('../../helper/validation');

class UserStorage {
  constructor() {}

  // login 요청
  static async reqLogin(_login, _password) {
    // 1. login, username valid check
    if (!string(_login)) {
      return {
        status: 400,
        isSuccess: false,
        message: 'Only string is allowed.',
      };
    }

    // 2. id exist check
    const isExist = await isIdExist(_login);
    if (!isExist) {
      return {
        status: 400,
        isSuccess: false,
        message: 'The ID does not exist.',
      };
    }

    // 3. log in successfully?
    const result = await login(_login, _password);
    if (result) {
      return {
        status: 200,
        isSuccess: true,
        message: 'Login successfully.',
      };
    } else {
      return {
        status: 400,
        isSuccess: false,
        message: 'Login failed.',
      };
    }
  }

  // register 요청
  static async reqRegister(_login, _username, _password) {
    // 1. login, username valid check
    if (!string(_login) && !string(_username)) {
      return {
        status: 400,
        isSuccess: false,
        message: 'Only string is allowed.',
      };
    }

    // 2. id 중복 check
    const isExist = await isIdExist(_login);
    if (isExist) {
      return {
        status: 400,
        isSuccess: false,
        message: 'The ID already exists.',
      };
    }

    await register(_login, _username, _password);

    return {
      status: 200,
      isSuccess: true,
      message: 'User created successfully.',
    };
  }
}

module.exports = UserStorage;