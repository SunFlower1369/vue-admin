/**
 * 所有的请求方法
 */
import axios from 'axios';
import base from './base';
//用来传参  post不能直接传参
import qs from 'querystring';

const api = {
  //登录
  login(params) {
    // console.log(params);
    return axios.post(base.login, qs.stringify(params));
  },
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
  //类目选择
  GetSelectCategory(params) {
    return axios.get(base.selectCategory, { params });
  },
  //添加商品
  InsertGoods(params) {
    return axios.get(base.insertGoods, { params });
  },
  //删除商品
  DeleteGoods(params) {
    return axios.get(base.deleteGoods, { params });
  },
  //编辑商品
  updateGoods(params) {
    return axios.get(base.updateGoods, { params });
  },
};
export default api;
