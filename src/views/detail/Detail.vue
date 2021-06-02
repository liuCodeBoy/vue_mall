<template>
  <div id="detail">
    <detail-nav-bar @titleclick="titleclick" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :paramInfo="goodsParam" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <good-list ref="recommend" :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './chilsComps/DetailNavBar.vue'
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from 'network/detail'
import DetailSwiper from './chilsComps/DetailSwiper.vue'
import DetailBaseInfo from './chilsComps/DetailBaseInfo.vue'
import DetailShopInfo from './chilsComps/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './chilsComps/DetailGoodsInfo.vue'
import DetailParamInfo from './chilsComps/DetailParamInfo.vue'
import DetailCommentInfo from './chilsComps/DetailCommentInfo.vue'
import GoodList from '../../components/content/goods/GoodList.vue'
import { itemListenerMixin } from 'common/mixin.js'
import { debounce } from 'common/utils'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      itemImgListener: null,
    }
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      this.topImages = res.result.itemInfo.topImages
      // console.log(res.result)
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      )
      this.shop = new Shop(res.result.shopInfo)
      this.detailInfo = res.result.detailInfo
      this.goodsParam = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      )
      if (res.result.cRate != 0) {
        this.commentInfo = res.result.rate.list[0]
      }

      this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop - 40)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop - 40)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 40)
      })
      // this.$nextTick(() => {

      // })
    })
    //请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list
    })
  },
  destroyed() {
    this.$bus.$off('imgeLoaded', this.itemImgListener)
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleclick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100)
    },
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
