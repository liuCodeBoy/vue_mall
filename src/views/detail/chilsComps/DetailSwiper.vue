<template>
  <swiper class="detailswiper">
    <swiper-item
      v-for="(item, index) in topImages"
      :key="index + 'detailTopImage'"
    >
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped>
.detailswiper {
  height: 370px;
}
</style>
