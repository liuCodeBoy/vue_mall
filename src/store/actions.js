import  {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
  addCart({state,commit},playLoad){
    let oldProduct = state.cartList.find(item => item.iid === playLoad.iid)
    //判断oldProduct
    if(oldProduct){
      commit(ADD_COUNTER,oldProduct)
    }else{
      playLoad.count = 1
      commit(ADD_TO_CART,playLoad)
    }
  }
} 