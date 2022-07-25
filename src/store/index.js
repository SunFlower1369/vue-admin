import Vue from 'vue';
import Vuex from 'vuex';
import Login from './loginModules/login';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Login,
  },
});
