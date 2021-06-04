<template>
  <div class="toast" v-show="isshow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isshow: false,
    }
  },
  methods: {
    show(message, duration) {
      this.message = message
      this.isshow = true
      setTimeout(() => {
        this.isshow = false
        this.message = ''
      }, duration)
    },
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 8px 9px;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 99;
}
</style>
