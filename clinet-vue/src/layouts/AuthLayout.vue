<template>
  <div class="auth_layout">
    <slot></slot>
    <button @click="buttonClick">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: 'auth layout',
  props: ['buttonText', 'buttonClick']
}
</script>

<style scoped>
.auth_layout {
  width: 300px;
  margin: 100px auto;
}

.auth_layout button {
  all: unset;
  border: 1px solid #000;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  background-color: #555;
  color: #fff;
  border-radius: 5px;
  transition: .2s;
}

.auth_layout button:active {
  opacity: 0.9;
}
</style>