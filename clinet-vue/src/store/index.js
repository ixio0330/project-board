import { getToken } from "@/utils/localStoarge";
import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: getToken() ? true : false,
    postUpdate: {
      title: '',
      content: '',
    }
  },
  getters: {},
  mutations: {
    isLoginTrue(state) {
      state.isLogin = true;
    },
    isLoginFalse(state) {
      state.isLogin = false;
    },
    postUpdate(state, { title, content }) {
      state.postUpdate = {
        title,
        content,
      };
    },
  },
  actions: {},
  modules: {},
});
