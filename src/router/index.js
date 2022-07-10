import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Home from '../components/index/Home/home.vue'
import Goods from '../components/index/Goods/goods.vue'
import Params from '../components/index/Params/params.vue'
import Sort from '../components/index/Sort/sort.vue'
import Order from '../components/index/Order/order.vue'
import OrderList from '../components/index/Order/OrderList/orderList.vue'
import OrderReturn from '../components/index/Order/OrderReturn/orderReturn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/index',
    component: Index
  },
  {
    path: '/login',
    component: Login
  }, {
    path: '/index',
    component: Index,
    children: [
      // {
      //   path:'/index',
      //   redirect:'/index/home',
      //   component:Home
      // },
      {
        path: '/',
        component: Home
      },
      {
        path: '/goods',
        component: Goods
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/sort',
        component: Sort
      },
      {
        path: '/order',
        component: Order,
        redirect:'/order/orderList',
        children: [
          {
            path: 'orderList',
            component: OrderList
          },
          {
            path: 'orderReturn',
            component: OrderReturn
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
