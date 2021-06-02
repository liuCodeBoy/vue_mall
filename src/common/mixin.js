import { debounce } from 'common/utils'
export const itemListenerMixin = {
   mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('imgeLoaded', this.itemImgListener)
   }
}