import  {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
  addCart({state,commit},playLoad){
      return new Promise((reslove,reject) =>{
        let oldProduct = state.cartList.find(item => item.iid === playLoad.iid)
        //判断oldProduct
        if(oldProduct){
          commit(ADD_COUNTER,oldProduct)
          reslove('数量加一')
        }else{
          playLoad.count = 1
          commit(ADD_TO_CART,playLoad)
          reslove('加入新商品')
        }
      })
  }
} 