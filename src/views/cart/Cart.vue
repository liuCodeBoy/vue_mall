<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLenght }})</div>
    </nav-bar>
    <carts-lists />
    <cart-buttom-bar />
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'
import CartsLists from './childComps/CartsLists.vue'
import CartButtomBar from './childComps/CartButtomBar.vue'
export default {
  name: 'Cart',
  components: { NavBar, CartsLists, CartButtomBar },
  computed: {
    ...mapGetters(['cartLenght', 'cartList']),
  },
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background: var(--color-tint);
  color: #fff;
  /* font-weight: 700; */
}
</style>
