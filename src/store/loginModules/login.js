export default {
  //还要映射到modules中
  namespaced: true,
  state: {
    userInfo: {
      username: '',
      token: '',
    },
  },
  //设置用户信息
  mutations: {
    //存信息
    setUser(state, payload) {
      state.userInfo = payload;
    },
    //做清空
    clearUser(state) {
      state.userInfo = {
        username: '',
        token: '',
      };
    },
  },
  getters: {},
  actions: {},
};
