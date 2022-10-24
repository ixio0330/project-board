<template>
  <AuthLayout buttonText="로그인" :buttonClick="register">
    <div>
      <p>
        <i class="fa-solid fa-user"></i>
        <span>아이디</span>
      </p>
      <Input type="text" v-model="id" :onKeyupEnter="register" />
    </div>
    <div>
      <p>
        <i class="fa-solid fa-tag"></i>
        <span>이름</span>
      </p>
      <Input type="text" v-model="name" :onKeyupEnter="register" />
    </div>
    <div>
      <p>
        <i class="fa-solid fa-lock"></i>
        <span>비밀번호</span>
      </p>
      <Input type="password" v-model="password" :onKeyupEnter="register" />
    </div>
  </AuthLayout>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout.vue';
import Input from '@/components/common/Input.vue';
import authApi from '@/api/auth';

export default {
  components: {
    AuthLayout,
    Input,
  },
  data() {
    return {
      id: '',
      password: '',
      name: '',
    }
  },
  methods: {
    async register() {
      if (!this.id || !this.password || !this.name) return;
      try {
        await authApi.register({ id: this.id, password: this.password, name: this.name });
        this.$router.push('/login');
      } catch (error) {
        window.alert(error.message);
      }
    }
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