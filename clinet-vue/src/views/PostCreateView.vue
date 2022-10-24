<template>
  <div class="post_create">
    <p>제목</p>
    <Input v-model="title" />
    <p>본문</p>
    <QuillEditor ref="editorRef" v-model:content="content" theme="snow" toolbar="essential" contentType="html" style="height: 400px" />
    <div class="btn_wrap">
      <button @click="onClickCancle">취소</button>
      <button @click="create">저장</button>
    </div>
  </div>
</template>

<script>
import postApi from '@/api/post';
import Input from '@/components/common/Input.vue';

export default {
  components: {
    Input,
  },
  data() {
    return {
      title: '제목을 입력해주세요.',
      content: '',
    }
  },
  methods: {
    onClickCancle() {
      this.$router.push('/');
    },
    async create() {
      if (!this.title || !this.content) return;
      try {
        await postApi.create({ title: this.title, content: this.content });
        this.$router.push('/');
      } catch (error) {
        window.alert(error.message);
      }
    }
  },
}
</script>

<style scoped>
.btn_wrap {
  margin-top: 30px;
  text-align: right;
}
.btn_wrap button {
  all: unset;
  padding: 8px 15px;
  border: 1px solid #555;
  background-color: #555;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
  transition: .2s;
}
.btn_wrap button:active {
  opacity: 0.9;
}
</style>