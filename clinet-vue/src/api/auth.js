import http from ".";

const authApi = {
  async login({ id, password }) {
    return await http.post('/user/login', {
      id, 
      password,
    });
  },
  async register({ id, password, name }) {
    return await http.post('/user/register',{
      id,
      password,
      name,
    });
  },
};

export default authApi;