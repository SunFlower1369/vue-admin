/**
 * 所有的请求方法
 */
import axios from 'axios';
import base from './base';
const api = {
  //商品列表
  getGoodsList(params) {
    //犯了个巨大错误  方法都没有写参数   怎么把参数传进来
    //使用base中的goodsList方法
    return axios.get(base.goodsList, {
      //传过来的参数 page  第几页
      params,
    });
  },
  search(params) {
    return axios.get(base.search, {
      params,
    });
  },
};
export default api;
