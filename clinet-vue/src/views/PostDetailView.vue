<template>
  <div class="post_detail">
    <header>
      <h2>{{ post.title }}</h2>
      <div class="icon_wrap" v-if="post.isOwner">
        <span @click="updatePost"><i class="fa-solid fa-pencil"></i></span>
        <span @click="deletPost"><i class="fa-solid fa-trash"></i></span>
      </div>
    </header>
    <main>
      <section class="post_info">
        <p>작성자 {{ post.name }}</p>
        <p>{{ post.created_on }}</p>
      </section>
      <section v-html="post.content"></section>
    </main>
  </div>
</template>

<script>
import postApi from '@/api/post';
import store from '@/store';

export default {
  name: 'Post detail',
  data() {
    return {
      post: {},
      postId: this.$router.currentRoute.value.params.id,
    }
  },
  methods: {
    async getDetailPost() {
      try {
        const response = await postApi.getById(this.postId);
        this.post = response;
        this.post.created_on = new Date(this.post.created_on).toLocaleString();
      } catch (error) {
        window.alert(error.message);
      }
    },
    async deletPost() {
      try {
        await postApi.delete(this.postId);
        this.$router.push('/');
      } catch (error) {
        window.alert(error.message);
      }
    },
    updatePost() {
      store.commit('postUpdate', { title: this.post.title, content: this.post.content });
      this.$router.push(`/post/update/${this.postId}`);
    }
  },
  mounted () {
    this.getDetailPost();
  },
}
</script>

<style scoped>
.post_detail header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #000;
}
.icon_wrap span {
  margin-left: 15px;
  cursor: pointer;
}
.post_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}
</style>