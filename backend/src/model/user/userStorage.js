const {
  register,
  isIdExist,
  login,
  logout,
  isTokenExist,
} = require('../../config/db');
const { isString } = require('../../helper/validation');

class UserStorage {
  constructor() {}

  // login 요청
  static async reqLogin(_login, _password) {
    // 1. login, username valid check
    if (!isString(_login)) {
      return {
        status: 400,
        isSuccess: false,
        message: 'Only string is allowed.',
      };
    }

    // 2. id exist check
    const isExistId = await isIdExist(_login);
    if (!isExistId) {
      return {
        status: 400,
        isSuccess: false,
        message: 'The ID does not exist.',
      };
    }

    // 3. token exist check
    const isExistToken = await isTokenExist(_login);
    if (isExistToken) {
      return {
        status: 400,
        isSuccess: false,
        message: 'Already logged in.',
      };
    }

    // 4. login
    const result = await login(_login, _password);
    if (!result) {
      return {
        status: 400,
        isSuccess: false,
        message: 'Login failed.',
      };
    }

    return {
      status: 200,
      isSuccess: true,
      message: 'Login successfully.',
      data: [
        {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      ],
    };
  }

  // register 요청
  static async reqRegister(_login, _username, _password) {
    // 1. login, username valid check
    if (!isString(_login) && !isString(_username)) {
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

    const result = await register(_login, _username, _password);

    if (!result) {
      return {
        status: 500,
        isSuccess: false,
        message: 'Server error.',
      };
    }

    return {
      status: 200,
      isSuccess: true,
      message: 'User created successfully.',
    };
  }

  static async reqLogout(_access_token) {
    const reulst = logout(_access_token);
    if (!reulst) {
      return {
        status: 400,
        isSuccess: false,
        message: 'Not logged in.',
      };
    }

    return {
      status: 200,
      isSuccess: true,
      message: 'Logout successfully.',
    };
  }
}

module.exports = UserStorage;
