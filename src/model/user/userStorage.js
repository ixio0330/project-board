const { register, isIdExist } = require('../../config/db');
const { string } = require('../../helper/validation');

class UserStorage {
  constructor() {}

  // login 요청
  static reqLogin(login, password) {
    // login 처리만 해주면 됨!
  }

  // register 요청
  static async reqRegister(login, username, password) {
    // 1. login, username valid check
    if (!string(login) && !string(username))
      return {
        status: 400,
        isSuccess: false,
        message: 'Only string is allowed.',
      };

    // 2. id 중복 check
    const isExist = await isIdExist(login);
    if (isExist)
      return {
        status: 400,
        isSuccess: false,
        message: 'The ID already exists.',
      };

    await register(login, username, password);

    return {
      status: 200,
      isSuccess: true,
      message: 'User created successfully.',
    };
  }
}

module.exports = UserStorage;
