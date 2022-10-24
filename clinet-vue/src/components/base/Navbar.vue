<template>
  <nav>
    <h1>
      <router-link to="/">
          <i class="fa-solid fa-code"></i>
          <!-- <span>B-coding</span> -->
      </router-link>
    </h1>
    <ul class="menu_list" v-if="isLogin">
      <li @click="logout">
        <span>로그아웃</span>
      </li>
    </ul>
    <ul class="menu_list" v-else>
      <li>
        <router-link to="/login">로그인</router-link>
      </li>
      <li>
        <router-link to="/register">회원가입</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import store from '@/store';
import { removeToken } from '@/utils/localStoarge';

export default {
  name: 'Nav bar',
  computed: {
    isLogin() {
      return store.state.isLogin; 
    }
  },
  methods: {
    logout() {
      removeToken();
      store.commit('isLoginFalse');
    }
  },
}
</script>

<style scoped>
nav {
  background-color: #555;
  color: rgb(236, 236, 236);
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 30px;
}
nav h1 span {
  margin-left: 10px;
}
.menu_list {
  display: flex;
}
.menu_list li {
  margin-left: 10px;
}
.menu_list li span {
  cursor: pointer;
}
</style>