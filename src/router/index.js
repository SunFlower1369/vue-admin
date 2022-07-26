import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Index from '../views/Index.vue';
import Home from '../views/index/Home/Home.vue';
import Goods from '../views/index/Goods/Goods.vue';
import Params from '../views/index/Params/Params.vue';
import Sort from '../views/index/Sort/Sort.vue';
import Order from '../views/index/Order/Order.vue';
import OrderList from '../views/index/Order/OrderList/OrderList.vue';
import OrderReturn from '../views/index/Order/OrderReturn/OrderReturn.vue';
import AddGoods from '../views/index/Goods/AddGoods.vue';
import ParamsInfo from '../views/index/Params/ParamsInfo/ParamsInfo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Index,
    meta: { isLogin: true },
    children: [
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/goods',
        component: Goods,
      },
      {
        path: '/addGoods',
        component: AddGoods,
      },
      {
        path: '/params',
        component: Params,
        redirect: '/params/paramsInfo',
        children: [
          {
            path: 'paramsInfo',
            component: ParamsInfo,
          },
        ],
      },
      {
        path: '/sort',
        component: Sort,
      },
      {
        path: '/order',
        component: Order,
        redirect: '/order/orderList',
        children: [
          {
            path: 'orderList',
            component: OrderList,
          },
          {
            path: 'orderReturn',
            component: OrderReturn,
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
