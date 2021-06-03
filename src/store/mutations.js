import  {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
  [ADD_COUNTER](state,playLoad){
    playLoad.count += 1

  },
  [ADD_TO_CART](state,playLoad){
    state.cartList.push(playLoad)
  }

}