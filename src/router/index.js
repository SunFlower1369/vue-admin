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

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/index',
    component: Index,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/index',
    component: Index,
    children: [
      // {
      //   path:'/index',
      //   redirect:'/index/home',
      //   component:Home
      // },
      {
        // path: '/home',
        path: '/',
        component: Home,
        // redirect: '/',
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
