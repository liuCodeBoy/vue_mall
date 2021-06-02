<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControltemp"
      class="tabview"
      v-show="isTabfixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scrollTop="scrollTop"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @swiperLoad="swiperLoad" />
      <recommend-view :recommends="recommends" />
      <feature />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import Feature from './childComps/Feature.vue'

import NavBar from 'components/common/navbar/NavBar'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin.js'

import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodList from 'components/content/goods/GoodList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backTop/BackTop.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] },
      },
      currentType: 'pop',
      isShow: false,
      isTabfixed: false,
      tabOffsetTop: 0,
      saveY: 0,
      itemImgListener: null,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  // mounted() {
  //   const refresh = debounce(this.$refs.scroll.refresh, 50)
  //   this.itemImgListener = () => {
  //     refresh()
  //   }
  //   this.$bus.$on('imgeLoaded', this.itemImgListener)
  // },
  activated() {
    this.$refs.scroll.refresh()

    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
    //2.取消全局事件的监听
    this.$bus.$off('imgeLoaded', this.itemImgListener)
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControltemp.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
    scrollTop(position) {
      this.isShow = -position.y > 1000
      this.isTabfixed = -position.y > this.tabOffsetTop
    },
    pullingUp() {
      this.getHomeGoods(this.currentType)
    },
    swiperLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },

    /**
     *网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.scroll.finishPullUp()
      })
    },
  },
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: white;
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

.tabview {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 44px;
}
</style>
