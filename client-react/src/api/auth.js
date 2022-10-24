import http from ".";

const authApi = {
  async login({ id, password }) {
    return await http.post('/user/login', {
      id,
      password,
    });
  },
  async register({ id, name, password }) {
    return await http.post('/user/register', {
      id,
      name,
      password,
    });
  }
};

export default authApi;