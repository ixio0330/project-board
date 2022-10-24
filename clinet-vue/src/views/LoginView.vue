<template>
  <AuthLayout buttonText="로그인" :buttonClick="login">
    <div>
      <p>
        <i class="fa-solid fa-user"></i>
        <span>아이디</span>
      </p>
      <Input type="text" v-model="id" :onKeyupEnter="login" />
    </div>
    <div>
      <p>
        <i class="fa-solid fa-lock"></i>
        <span>비밀번호</span>
      </p>
      <Input type="password" v-model="password" :onKeyupEnter="login" />
    </div>
  </AuthLayout>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout.vue';
import Input from '@/components/common/Input.vue';
import authApi from '@/api/auth';
import { setToken } from '@/utils/localStoarge';
import store from '@/store';

export default {
  components: {
    AuthLayout,
    Input,
  },
  data() {
    return {
      id: '',
      password: '',
    }
  },
  methods: {
    async login() {
      if (!this.id || !this.password) return;
      try {
        const { token } = await authApi.login({ id: this.id, password: this.password });
        setToken(token);
        store.commit('isLoginTrue');
        this.$router.push('/');
      } catch(error) {
        window.alert(error.message);
      }
    },
  },
}
</script>

<style scoped>
div {
  margin-bottom: 30px;
}
span {
  margin-left: 10px;
}
</style>