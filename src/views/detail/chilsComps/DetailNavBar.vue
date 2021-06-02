<template>
  <nav-bar>
    <div slot="left" class="back" @click="back">
      <img src="~assets/img/common/back.svg" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        class="title-item"
        :key="index + 'item'"
        :class="{ active: index === currentIndex }"
        @click="changeItem(index)"
      >
        <span> {{ item }}</span>
      </div>
    </div></nav-bar
  >
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components: { NavBar },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    changeItem(index) {
      this.currentIndex = index
      this.$emit('titleclick', index)
    },
    back() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.title {
  display: flex;
}
.back {
  margin-top: 6px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
