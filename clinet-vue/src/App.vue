<template>
  <div>
    <Navbar />
    <div class="page_view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/base/Navbar.vue';
export default {
  components: {
    Navbar,
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

.page_view {
  width: 80vw;
  margin: 0 auto;
}
</style>