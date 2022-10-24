import http from ".";

const postApi = {
  async getAll() {
    return await http.get('/post');
  },
  async getById(_id) {
    return await http.get(`/post/${_id}`);
  },
  async create({ title, content }) {
    return await http.post('/post', {
      title, 
      content,
    });
  },
  async update({ id, title, content }) {
    return await http.put(`/post/${id}`, {
      title,
      content,
    });
  },
  async delete(_id) {
    return await http.delete(`/post/${_id}`);
  }
};

export default postApi;