<template>
  <table>
    <thead>
      <tr>
        <th>작성자</th>
        <th>제목</th>
        <th>등록일</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(post) in posts" :key="post.id" @click="redirectDeatil(post.id)">
        <td>{{ post.name }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.created_on.slice(0, 10) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Post list',
  props: {
    posts: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    }
  },
  methods: {
    redirectDeatil(_id) {
      this.$router.push(`/post/${_id}`)
    }
  },
}
</script>

<style scoped>
table {
  width: 100%;
}
thead {
  text-align: left;
}
thead tr {
  cursor: auto;
}
tr {
  cursor: pointer;
}
th {
  padding-bottom: 15px;
  border-bottom: 2px solid #000;
}
td {
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}
</style>