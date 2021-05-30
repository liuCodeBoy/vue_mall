<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature />
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
    <good-list :goods="showGoods" />
  </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import Feature from './childComps/Feature.vue'

import NavBar from 'components/common/navbar/NavBar'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodList from 'components/content/goods/GoodList.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodList,
  },
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
      })
    },
  },
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
