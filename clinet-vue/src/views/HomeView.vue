<template>
  <div class="home">
    <header>
      <h3>게시판</h3>
      <router-link v-show="isLogin" to="/post">글쓰기</router-link>
    </header>
    <main>
      <PostList :posts="posts" />
    </main>
  </div>
</template>

<script>
import postApi from '@/api/post';
import store from '@/store';
import PostList from '@/components/post/PostList.vue';

export default {
  name: 'Home view',
  components: {
    PostList,
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    async getAllPosts() {
      try {
        const response = await postApi.getAll();
        this.posts = response;
      } catch (error) {
        window.alert(error.message);
      }
    }
  },
  computed: {
    isLogin() {
      return store.state.isLogin; 
    }
  },
  mounted () {
    this.getAllPosts();
  },
}
</script>

<style scoped>
.home header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
</style>