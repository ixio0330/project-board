<template>
  <input :type="type" v-model="model" @keyup.enter="onKeyupEnter" />
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    onKeyupEnter: {
      type: Function,
      default: () => {
        return () => {};
      }
    }
  },
  data() {
    return {
      model: this.value,
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('input', event.target.value);
    }
  },
}
</script>

<style scoped>
input {
  all: unset;
  border: 1px solid rgb(207, 207, 207);
  width: 100%;
  padding: 7px 15px;
  box-sizing: border-box;
}
</style>